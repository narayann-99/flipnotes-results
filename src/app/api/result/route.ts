import { NextRequest, NextResponse } from "next/server";
import { getProvider, ProviderError, ProviderType } from "@/lib/providers/provider";
import { validateRollNumber } from "@/lib/validation/rollNo";
import { Logger } from "@/lib/logger";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  let requestedRollNo: string | undefined;

  try {
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      Logger.warn("Invalid JSON payload received", { statusCode: 400, errorCode: "INVALID_ROLL_NO" });
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request payload.",
          code: "INVALID_ROLL_NO",
          retryable: false,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const rollNo = (body as { rollNo?: unknown; providerType?: ProviderType })?.rollNo;
    const providerOverride = (body as { providerType?: ProviderType })?.providerType;

    const validation = validateRollNumber(rollNo);
    requestedRollNo = validation.normalizedRollNo || (typeof rollNo === "string" ? rollNo : undefined);

    if (!validation.isValid) {
      const durationMs = Date.now() - startTime;
      Logger.warn("Roll number validation failed", {
        rollNo: requestedRollNo,
        durationMs,
        statusCode: 400,
        errorCode: validation.code || "INVALID_ROLL_NO",
      });

      return NextResponse.json(
        {
          success: false,
          error: validation.error || "Invalid roll number format.",
          code: validation.code || "INVALID_ROLL_NO",
          retryable: false,
          timestamp: new Date().toISOString(),
        },
        { status: 400 }
      );
    }

    const provider = getProvider(providerOverride);
    Logger.info("Dispatching query to provider", {
      rollNo: validation.normalizedRollNo,
      provider: provider.name,
    });

    const result = await provider.getResult(validation.normalizedRollNo, {
      timeoutMs: 10000,
    });

    const durationMs = Date.now() - startTime;
    Logger.info("Result retrieved successfully", {
      rollNo: validation.normalizedRollNo,
      provider: provider.name,
      durationMs,
      statusCode: 200,
    });

    return NextResponse.json(
      {
        success: true,
        data: result,
        meta: {
          provider: provider.name,
          durationMs,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const durationMs = Date.now() - startTime;

    if (error instanceof ProviderError) {
      Logger.warn("Provider returned error", {
        rollNo: requestedRollNo,
        durationMs,
        statusCode: error.statusCode,
        errorCode: error.code,
        message: error.message,
      });

      return NextResponse.json(
        {
          success: false,
          error: error.message,
          code: error.code,
          retryable: error.retryable,
          timestamp: new Date().toISOString(),
        },
        { status: error.statusCode }
      );
    }

    Logger.error("Unhandled API exception", {
      rollNo: requestedRollNo,
      durationMs,
      statusCode: 500,
      error: error instanceof Error ? error.message : String(error),
    });

    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred while processing the request.",
        code: "INTERNAL_ERROR",
        retryable: true,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
