import { Customer } from './customer';
import { Location } from './location';
import { Vehicle } from './vehicle';

/**
 * Represents an appointment with scheduling details.
 */
export interface Appointment {
  /** The date and time of the appointment. */
  appointmentDateTime: Date;

  /** The customer associated with the appointment. */
  customer: Customer;

  /** The location where the appointment will take place. */
  location: Location;

  /** The vehicle involved in the appointment. */
  vehicle: Vehicle;

  /** The duration of the appointment in minutes. */
  appointmentDuration: number;
}

/**
 * Defines the allowable hours for scheduling appointments.
 */
export interface AppointmentHours {
  /** The starting hour for appointments (24-hour format). */
  start: number;

  /** The ending hour for appointments (24-hour format). */
  end: number;
}