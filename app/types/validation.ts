export interface ValidationErrors {
  [key: string]: string | ValidationErrors;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationErrors;
}