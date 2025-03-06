import { app } from '../core/_index';
import { HttpRequest, HttpResponse } from '@benjamin-hugueley/magic';
import { validators } from '../validators/_index';

function appointments(): void {
  app.post('/appointments', async (req: HttpRequest, res: HttpResponse) => {
    const validationResult = validators.Appointment(req.params?.body);

    if (!validationResult.valid) {
      res.send({
        body: { errors: validationResult.errors },
        headers: { 'Content-Type': 'application/json' },
        status: 400,
      });
      return;
    }

    res.send({
      body: req.params?.body,
      headers: { 'Content-Type': 'application/json' }
    });
  });
}

export { appointments };