import { app } from '../core/_index';
import { HttpRequest, HttpResponse } from '@benjamin-hugueley/magic';
import { validators } from '../validators/_index';
import { repositories } from '../repositories/_index';
import { AppointmentHours } from '../models/appointment';

/**
 * Defines the allowed appointment hours.
 */
const appointmentHours: AppointmentHours = { start: 9, end: 17 };

/**
 * Handles appointment-related API routes.
 */
function appointments(): void {
  /**
   * Creates a new appointment after validation.
   */
  app.post('/appointments', async (req: HttpRequest, res: HttpResponse) => {
    const validationResult = validators.Appointment(req.params?.body, appointmentHours);

    if (!validationResult.valid) {
      res.send({
        body: { errors: validationResult.errors },
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
      return;
    }

    const appointment = req.params?.body;

    /**
     * Checks if the appointment already exists.
     */
    if (repositories.appointments.conflicts(appointment)) {
      res.send({
        body: { error: "Time not available: Scheduling conflict detected." },
        headers: { 'Content-Type': 'application/json' },
        status: 409,
      });
      return;
    }

    repositories.appointments.add(appointment);
    res.send({
      body: { message: 'Appointment created successfully' },
      headers: { 'Content-Type': 'application/json' },
      status: 201,
    });
  });

  /**
   * Retrieves all stored appointments.
   */
  app.get('/appointments', async (req: HttpRequest, res: HttpResponse) => {
    const allAppointments = repositories.appointments.getAll();
    res.send({
      body: allAppointments,
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  });
}

export { appointments };