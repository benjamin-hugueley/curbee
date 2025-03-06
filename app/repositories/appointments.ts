import { Appointment } from '../models/appointment';

/**
 * Stores appointment data in memory.
 */
const appointmentsData: Appointment[] = [];

export const appointments = {
  /**
   * Adds a new appointment to the in-memory store.
   *
   * @param appointment - The appointment to be added.
   */
  add(appointment: Appointment): void {
    appointmentsData.push(appointment);
  },

  /**
   * Retrieves all stored appointments.
   *
   * @returns An array of all appointments.
   */
  getAll(): Appointment[] {
    return appointmentsData;
  },

  /**
   * Checks if an appointment already exists.
   * Compares the appointment date and customer email to detect duplicates.
   *
   * @param appointment - The appointment to check.
   * @returns A boolean indicating whether the appointment exists.
   */
  exists(appointment: Appointment): boolean {
    return appointmentsData.some(existing =>
      new Date(existing.appointmentDateTime).getTime() === new Date(appointment.appointmentDateTime).getTime() &&
      existing.customer.email === appointment.customer.email
    );
  }
};