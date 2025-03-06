import { ValidationErrors, ValidationResult } from '../types/_index'

export function Vehicle(obj: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  if (!obj || typeof obj !== 'object') {
    errors.general = "Vehicle data is missing or invalid";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };
  if (typeof data.vin !== "string") {
    errors.vin = "Expected string";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}