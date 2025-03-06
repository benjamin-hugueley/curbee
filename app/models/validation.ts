/**
 * Represents a collection of validation errors.
 * Each key corresponds to a field, and the value can be a string message or a nested object for deeper validation errors.
 */
export interface ValidationErrors {
  [key: string]: string | ValidationErrors;
}

/**
 * Represents the result of a validation process.
 * Indicates whether the validation was successful and contains any associated errors.
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}