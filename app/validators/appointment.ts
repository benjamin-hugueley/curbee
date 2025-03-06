import { Customer } from './customer'
import { Location } from './location'
import { Vehicle } from './vehicle'
import { ValidationErrors, ValidationResult } from '../types/_index'

export function Appointment(obj: unknown): ValidationResult {
  const errors: ValidationErrors = {};

  if (!obj || typeof obj !== 'object') {
    errors.appointment = "No data provided or invalid type";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };

  // Validate appointmentDateTime
  const date = new Date(data.appointmentDateTime);
  if (isNaN(date.getTime())) {
    errors.appointmentDateTime = "Invalid date";
  }

  // Validate appointmentDuration
  if (typeof data.appointmentDuration !== "number") {
    errors.appointmentDuration = "Must be a number";
  }

  // Validate customer
  const customerValidation = Customer(data.customer);
  if (!customerValidation.valid) {
    errors.customer = customerValidation.errors;
  }

  // Validate location
  const locationValidation = Location(data.location);
  if (!locationValidation.valid) {
    errors.location = locationValidation.errors;
  }

  // Validate vehicle
  const vehicleValidation = Vehicle(data.vehicle);
  if (!vehicleValidation.valid) {
    errors.vehicle = vehicleValidation.errors;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}