import { ValidationErrors, ValidationResult } from '../models/_index'

/**
 * Validates a vehicle object to ensure it conforms to the expected structure.
 *
 * @param obj - The input data to validate.
 * @returns A ValidationResult indicating whether the object is valid and any validation errors.
 */
export function Vehicle(obj: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  /**
   * Ensures the input is an object before proceeding with validation.
   */
  if (!obj || typeof obj !== 'object') {
    errors.general = "Vehicle data is missing or invalid";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };

  /**
   * Validates the VIN (Vehicle Identification Number) field.
   */
  if (typeof data.vin !== "string") {
    errors.vin = "Expected string";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}