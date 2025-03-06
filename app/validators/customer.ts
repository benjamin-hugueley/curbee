import { ValidationErrors, ValidationResult } from '../types/_index'

export function Customer(obj: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  if (!obj || typeof obj !== 'object') {
    errors.general = "Customer data is missing or invalid";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };
  if (typeof data.firstName !== "string") {
    errors.firstName = "Expected string";
  }
  if (typeof data.lastName !== "string") {
    errors.lastName = "Expected string";
  }
  if (typeof data.phone !== "number") {
    errors.phone = "Expected number";
  }
  if (typeof data.email !== "string") {
    errors.email = "Expected email string";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}