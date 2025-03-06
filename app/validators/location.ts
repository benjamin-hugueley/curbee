import { ValidationErrors, ValidationResult } from '../types/_index'

export function Location(obj: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  if (!obj || typeof obj !== 'object') {
    errors.general = "Location data is missing or invalid";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };
  if (typeof data.line1 !== "string") {
    errors.line1 = "Expected string";
  }
  if (data.line2 !== undefined && typeof data.line2 !== "string") {
    errors.line2 = "Expected string if provided";
  }
  if (typeof data.zipCode !== "string") {
    errors.zipCode = "Expected string";
  }
  if (typeof data.state !== "string") {
    errors.state = "Expected string";
  }
  if (typeof data.city !== "string") {
    errors.city = "Expected string";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}