import { ResultData } from "@/types";
import { ResultProvider, ProviderError, ProviderOptions } from "./types";
import { validateRollNumber } from "@/lib/validation/rollNo";

export class FutureProvider implements ResultProvider {
  public readonly name = "FutureProvider";

  async getResult(rollNo: string, _options?: ProviderOptions): Promise<ResultData> {
    const validation = validateRollNumber(rollNo);
    if (!validation.isValid) {
      throw new ProviderError(
        validation.code || "INVALID_ROLL_NO",
        validation.error || "Invalid roll number format.",
        400,
        false
      );
    }

    // Placeholder for future authorized data source connection
    // When connected, this will authenticate via OAuth/API tokens and fetch live results.
    throw new ProviderError(
      "SERVICE_UNAVAILABLE",
      "Authorized university database integration is not yet connected.",
      503,
      false
    );
  }
}
