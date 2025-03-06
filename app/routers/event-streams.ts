import { app, config, watcher } from '../core/_index';
import { HttpRequest, HttpResponse } from '@benjamin-hugueley/magic';

/**
 * Registers an endpoint to watch for file events and stream them over HTTP.
 */
function eventStreams(): void {
  app.get('/event-streams/watch', (req: HttpRequest, res: HttpResponse) => {
    // Initialize a global watcher if not already set.
    if (!(global as any).watcher) {
      (global as any).watcher = watcher(config.PUBLIC_DIR);
    }

    // Define a callback to be invoked when a file change is detected.
    const onChange = (event: string, path: string): void => {
      res.send({
        body: { event, path },
        headers: { 'Content-Type': 'text/event-stream' }
      });
    };

    // Subscribe to file changes.
    (global as any).watcher.subscribe(onChange);

    // Set up the HTTP response with appropriate headers and event handlers.
    res.send({
      headers: {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive'
      },
      handlers: [
        {
          event: 'close',
          handler: (err: Error) => {
            if (err) console.log('Socket closed with error:', err);
            (global as any).watcher.unsubscribe(onChange);
            res.destroy();
          }
        },
        {
          event: 'error',
          handler: (err: Error) => {
            console.error('Socket error:', err);
          }
        }
      ]
    });
  });
}

export { eventStreams };