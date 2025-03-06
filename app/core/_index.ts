import { build } from '@benjamin-hugueley/magic';
import { config } from './config';
import { watcher } from './watcher';

/**
 * Initializes the application with predefined security headers and allowed HTTP methods.
 */
const app = build({
  headers: config.SECURITY_HEADERS,
  methods: config.HTTP_METHODS
});

export { app, config, watcher };