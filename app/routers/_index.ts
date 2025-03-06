import { eventStreams } from './event-streams.js';
import { files } from './files.js';
import { appointments } from './appointments.js';

/**
 * Provides a namespace for all route handlers.
 * This allows for structured and organized access to different routers.
 */
const routers = {
  eventStreams,
  files,
  appointments
};

export { routers };