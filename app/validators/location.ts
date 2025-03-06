import { ValidationErrors, ValidationResult } from '../models/_index'

/**
 * Validates a location object to ensure it conforms to the expected structure.
 *
 * @param obj - The input data to validate.
 * @returns A ValidationResult indicating whether the object is valid and any validation errors.
 */
export function Location(obj: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  /**
   * Ensures the input is an object before proceeding with validation.
   */
  if (!obj || typeof obj !== 'object') {
    errors.general = "Location data is missing or invalid";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };

  /**
   * Validates the required address line 1 field.
   */
  if (typeof data.line1 !== "string") {
    errors.line1 = "Expected string";
  }

  /**
   * Validates the optional address line 2 field.
   */
  if (data.line2 !== undefined && typeof data.line2 !== "string") {
    errors.line2 = "Expected string if provided";
  }

  /**
   * Validates the ZIP code field.
   */
  if (typeof data.zipCode !== "string") {
    errors.zipCode = "Expected string";
  }

  /**
   * Validates the state field.
   */
  if (typeof data.state !== "string") {
    errors.state = "Expected string";
  }

  /**
   * Validates the city field.
   */
  if (typeof data.city !== "string") {
    errors.city = "Expected string";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}