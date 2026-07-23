import { ResultData } from "@/types";
import { ResultProvider, ProviderError, ProviderOptions, ProviderErrorCode } from "./types";
import { validateRollNumber } from "@/lib/validation/rollNo";

export interface HttpProviderConfig {
  baseUrl?: string;
  apiKey?: string;
  maxRetries?: number;
  timeoutMs?: number;
}

export class HttpApiProvider implements ResultProvider {
  public readonly name = "HttpApiProvider";
  private baseUrl: string;
  private apiKey: string | undefined;
  private maxRetries: number;
  private defaultTimeoutMs: number;

  constructor(config: HttpProviderConfig = {}) {
    this.baseUrl = config.baseUrl || process.env.RESULT_API_URL || "";
    this.apiKey = config.apiKey || process.env.RESULT_API_KEY;
    this.maxRetries = config.maxRetries ?? 3;
    this.defaultTimeoutMs = config.timeoutMs ?? 8000;
  }

  async getResult(rollNo: string, options?: ProviderOptions): Promise<ResultData> {
    const validation = validateRollNumber(rollNo);
    if (!validation.isValid) {
      throw new ProviderError(
        validation.code || "INVALID_ROLL_NO",
        validation.error || "Invalid roll number format.",
        400,
        false
      );
    }

    if (!this.baseUrl) {
      throw new ProviderError(
        "SERVICE_UNAVAILABLE",
        "Result API endpoint base URL is not configured.",
        503,
        false
      );
    }

    const cleanRollNo = validation.normalizedRollNo;
    const timeout = options?.timeoutMs || this.defaultTimeoutMs;

    let attempt = 0;
    let lastError: ProviderError | null = null;

    while (attempt < this.maxRetries) {
      attempt++;
      try {
        return await this.executeFetch(cleanRollNo, timeout, options?.signal);
      } catch (err: unknown) {
        if (err instanceof ProviderError) {
          lastError = err;
          // Do not retry non-retryable errors (e.g. 400 Bad Request, 404 Not Found, 401 Unauthorized)
          if (!err.retryable || attempt >= this.maxRetries) {
            throw err;
          }
        } else {
          lastError = new ProviderError(
            "INTERNAL_ERROR",
            err instanceof Error ? err.message : "Network error during result retrieval.",
            500,
            true
          );
          if (attempt >= this.maxRetries) {
            throw lastError;
          }
        }

        // Exponential backoff delay with random jitter (e.g., 300ms, 600ms, 1200ms)
        const delayMs = Math.pow(2, attempt - 1) * 300 + Math.random() * 150;
        await this.delay(delayMs, options?.signal);
      }
    }

    throw lastError || new ProviderError("SERVICE_UNAVAILABLE", "Failed to retrieve result after retries.", 503, true);
  }

  private async executeFetch(rollNo: string, timeoutMs: number, externalSignal?: AbortSignal): Promise<ResultData> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    // Combine external signal and internal timeout controller
    const onExternalAbort = () => controller.abort();
    if (externalSignal) {
      externalSignal.addEventListener("abort", onExternalAbort);
    }

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
      };

      if (this.apiKey) {
        headers["Authorization"] = `Bearer ${this.apiKey}`;
      }

      const response = await fetch(`${this.baseUrl}/api/v1/result/${encodeURIComponent(rollNo)}`, {
        method: "GET",
        headers,
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMsg = `Server error (${response.status})`;
        try {
          const body = await response.json();
          if (body && typeof body.message === "string") {
            errorMsg = body.message;
          }
        } catch {
          // Ignore JSON parse error on non-200 responses
        }

        const { code, retryable } = this.mapStatusToErrorCode(response.status);
        throw new ProviderError(code, errorMsg, response.status, retryable);
      }

      const data = await response.json();
      return data as ResultData;
    } catch (err: unknown) {
      if (err instanceof ProviderError) {
        throw err;
      }
      if (err instanceof Error && err.name === "AbortError") {
        throw new ProviderError("TIMEOUT", `Request timed out after ${timeoutMs}ms`, 408, true);
      }
      throw new ProviderError("SERVICE_UNAVAILABLE", err instanceof Error ? err.message : "Connection failed", 503, true);
    } finally {
      clearTimeout(timer);
      if (externalSignal) {
        externalSignal.removeEventListener("abort", onExternalAbort);
      }
    }
  }

  private mapStatusToErrorCode(status: number): { code: ProviderErrorCode; retryable: boolean } {
    switch (status) {
      case 400:
        return { code: "INVALID_ROLL_NO", retryable: false };
      case 401:
      case 403:
        return { code: "UNAUTHORIZED", retryable: false };
      case 404:
        return { code: "NOT_FOUND", retryable: false };
      case 408:
        return { code: "TIMEOUT", retryable: true };
      case 429:
        return { code: "RATE_LIMITED", retryable: true };
      case 502:
      case 503:
      case 504:
        return { code: "SERVICE_UNAVAILABLE", retryable: true };
      default:
        return { code: "INTERNAL_ERROR", retryable: status >= 500 };
    }
  }

  private delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        return reject(new ProviderError("TIMEOUT", "Operation aborted during retry wait.", 408, true));
      }
      const timer = setTimeout(() => resolve(), ms);
      if (signal) {
        signal.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(new ProviderError("TIMEOUT", "Operation aborted during retry wait.", 408, true));
        });
      }
    });
  }
}
