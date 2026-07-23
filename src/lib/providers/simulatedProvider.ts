import { ResultData } from "@/types";
import { ResultProvider, ProviderError, ProviderOptions } from "./types";
import { validateRollNumber } from "@/lib/validation/rollNo";
import { MockProvider } from "./mockProvider";

export class SimulatedProvider implements ResultProvider {
  public readonly name = "SimulatedProvider";
  private fallbackMock = new MockProvider();

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

    const cleanRollNo = validation.normalizedRollNo;

    // Random latency between 1000ms and 3000ms (1 to 3 seconds)
    const randomLatency = Math.floor(Math.random() * 2000) + 1000;
    await this.delay(randomLatency, options?.signal);

    // Chaos Simulation (random network behavior for testing application resilience)
    // Only apply random chaos if not a specific deterministic test roll number unless explicitly intended
    const isDeterministicTestRoll = cleanRollNo === "2504850100131";

    if (!isDeterministicTestRoll) {
      const rand = Math.random();

      // 1. Random Timeout (~10% chance)
      if (rand < 0.10) {
        throw new ProviderError(
          "TIMEOUT",
          "Simulated network timeout: University registry server did not respond within expected threshold.",
          408,
          true
        );
      }

      // 2. Random Network Failure / Provider Unavailable (~10% chance)
      if (rand < 0.20) {
        throw new ProviderError(
          "SERVICE_UNAVAILABLE",
          "Simulated network failure: Unable to establish TCP handshake with registry backend.",
          503,
          true
        );
      }

      // 3. Random Result Not Found (~15% chance)
      if (rand < 0.35) {
        throw new ProviderError(
          "NOT_FOUND",
          `Simulated query: No academic transcript record found for roll number ${cleanRollNo}.`,
          404,
          false
        );
      }
    }

    // Return student result data using dataset generator
    return this.fallbackMock.getResult(cleanRollNo, { timeoutMs: 0 });
  }

  private delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {
        return reject(new ProviderError("TIMEOUT", "Request aborted before delay completion.", 408, true));
      }

      const timer = setTimeout(() => resolve(), ms);

      if (signal) {
        signal.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(new ProviderError("TIMEOUT", "Request aborted during execution.", 408, true));
        });
      }
    });
  }
}
