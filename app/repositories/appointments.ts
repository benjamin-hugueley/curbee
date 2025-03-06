import { Appointment } from '../types/appointment';

const appointments: Appointment[] = [];

export const appointmentRepository = {
  add(appointment: Appointment): void {
    appointments.push(appointment);
  },
  getAll(): Appointment[] {
    return appointments;
  },
};