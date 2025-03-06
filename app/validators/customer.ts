import { ValidationErrors, ValidationResult } from '../models/_index'

/**
 * Validates a customer object to ensure it conforms to the expected structure.
 *
 * @param obj - The input data to validate.
 * @returns A ValidationResult indicating whether the object is valid and any validation errors.
 */
export function Customer(obj: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  /**
   * Ensures the input is an object before proceeding with validation.
   */
  if (!obj || typeof obj !== 'object') {
    errors.general = "Customer data is missing or invalid";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };

  /**
   * Validates the first name field.
   */
  if (typeof data.firstName !== "string") {
    errors.firstName = "Expected string";
  }

  /**
   * Validates the last name field.
   */
  if (typeof data.lastName !== "string") {
    errors.lastName = "Expected string";
  }

  /**
   * Validates the phone number field.
   */
  if (typeof data.phone !== "number") {
    errors.phone = "Expected number";
  }

  /**
   * Validates the email field.
   */
  if (typeof data.email !== "string") {
    errors.email = "Expected email string";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}