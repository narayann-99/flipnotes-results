import { ProviderErrorCode } from "@/lib/providers/types";

export interface ValidationResult {
  isValid: boolean;
  normalizedRollNo: string;
  error?: string;
  code?: ProviderErrorCode;
}

export function validateRollNumber(input: unknown): ValidationResult {
  if (typeof input !== "string") {
    return {
      isValid: false,
      normalizedRollNo: "",
      error: "Roll number must be provided as a text string.",
      code: "INVALID_ROLL_NO",
    };
  }

  const trimmed = input.trim();

  if (!trimmed) {
    return {
      isValid: false,
      normalizedRollNo: "",
      error: "Roll number cannot be empty.",
      code: "INVALID_ROLL_NO",
    };
  }

  if (!/^\d+$/.test(trimmed)) {
    return {
      isValid: false,
      normalizedRollNo: trimmed,
      error: "Roll number must contain numerical digits only.",
      code: "INVALID_ROLL_NO",
    };
  }

  if (trimmed.length < 10 || trimmed.length > 15) {
    return {
      isValid: false,
      normalizedRollNo: trimmed,
      error: "Roll number must be between 10 and 15 digits in length.",
      code: "INVALID_ROLL_NO",
    };
  }

  return {
    isValid: true,
    normalizedRollNo: trimmed,
  };
}
