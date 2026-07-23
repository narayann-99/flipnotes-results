import { ResultData } from "@/types";

export type ProviderErrorCode =
  | "INVALID_ROLL_NO"
  | "NOT_FOUND"
  | "UNAUTHORIZED"
  | "TIMEOUT"
  | "SERVICE_UNAVAILABLE"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";

export class ProviderError extends Error {
  public readonly code: ProviderErrorCode;
  public readonly statusCode: number;
  public readonly retryable: boolean;

  constructor(
    code: ProviderErrorCode,
    message: string,
    statusCode: number = 500,
    retryable: boolean = false
  ) {
    super(message);
    this.name = "ProviderError";
    this.code = code;
    this.statusCode = statusCode;
    this.retryable = retryable;
    
    Object.setPrototypeOf(this, ProviderError.prototype);
  }
}

export interface ProviderOptions {
  timeoutMs?: number;
  signal?: AbortSignal;
}

export interface ResultProvider {
  readonly name: string;
  getResult(rollNo: string, options?: ProviderOptions): Promise<ResultData>;
}
