import { Customer } from './customer';
import { Location } from './location';
import { Vehicle } from './vehicle';
import {
  AppointmentHours,
  ValidationResult,
  ValidationErrors
} from '../models/_index';

/**
 * Validates an appointment object to ensure it conforms to the expected structure.
 *
 * @param obj - The input data to validate.
 * @param appointmentHours - Optional parameter defining allowed appointment hours.
 * @returns A ValidationResult indicating whether the object is valid and any validation errors.
 */
export function Appointment(
  obj: unknown,
  appointmentHours?: AppointmentHours
): ValidationResult {
  const errors: ValidationErrors = {};

  /**
   * Ensures the input is an object before proceeding with validation.
   */
  if (!obj || typeof obj !== 'object') {
    errors.appointment = "No data provided or invalid type";
    return { valid: false, errors };
  }

  const data = obj as { [key: string]: any };

  /**
   * Validates the appointment date and time.
   */
  const date = new Date(data.appointmentDateTime);
  if (isNaN(date.getTime())) {
    errors.appointmentDateTime = "Invalid date";
  } else if (appointmentHours) {
    const hour = date.getHours();
    if (hour < appointmentHours.start || hour >= appointmentHours.end) {
      errors.appointmentDateTime = `Appointment must be scheduled between ${appointmentHours.start}:00 and ${appointmentHours.end}:00`;
    }
  }

  /**
   * Validates the appointment duration.
   */
  if (typeof data.appointmentDuration !== "number") {
    errors.appointmentDuration = "Must be a number";
  }

  /**
   * Validates the customer information.
   */
  const customerValidation = Customer(data.customer);
  if (!customerValidation.valid) {
    errors.customer = customerValidation.errors;
  }

  /**
   * Validates the location information.
   */
  const locationValidation = Location(data.location);
  if (!locationValidation.valid) {
    errors.location = locationValidation.errors;
  }

  /**
   * Validates the vehicle information.
   */
  const vehicleValidation = Vehicle(data.vehicle);
  if (!vehicleValidation.valid) {
    errors.vehicle = vehicleValidation.errors;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}