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
   * Checks if an appointment conflicts with an existing one.
   * Determines if the new appointment's time period overlaps with any existing appointment.
   *
   * @param appointment - The appointment to check.
   * @returns A boolean indicating whether there is a scheduling conflict.
   */
  conflicts(appointment: Appointment): boolean {
    const newStart = new Date(appointment.appointmentDateTime).getTime();
    const newEnd = newStart + appointment.appointmentDuration * 60 * 1000; // Convert minutes to milliseconds

    return appointmentsData.some(existing => {
      const existingStart = new Date(existing.appointmentDateTime).getTime();
      const existingEnd = existingStart + existing.appointmentDuration * 60 * 1000;

      // Check if the two time periods intersect
      return newStart < existingEnd && newEnd > existingStart;
    });
  }
};