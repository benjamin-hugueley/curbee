import { app } from './core/_index.js';
import { routers } from './routers/_index.js';

/**
 * Registers all application routes.
 */
routers.appointments();
routers.eventStreams();
routers.files();

/**
 * Starts the server and listens on port 3000.
 */
app.listen(3000, () => console.log('Server running at http://localhost:3000/'));