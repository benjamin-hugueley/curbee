import { app, config, watcher } from '../core/_index';
import { HttpRequest, HttpResponse } from '@benjamin-hugueley/magic';

/**
 * Establishes an event stream for monitoring file changes.
 */
function eventStreams(): void {
  app.get('/event-streams/watch', (req: HttpRequest, res: HttpResponse) => {
    /**
     * Initializes the file watcher if it has not already been set.
     */
    if (!(global as any).watcher) {
      (global as any).watcher = watcher(config.PUBLIC_DIR);
    }

    /**
     * Handles file change events and sends updates to the client.
     *
     * @param event - The type of file event detected.
     * @param path - The file path that changed.
     */
    const onChange = (event: string, path: string): void => {
      res.send({
        body: { event, path },
        headers: { 'Content-Type': 'text/event-stream' }
      });
    };

    /**
     * Subscribes to file change events.
     */
    (global as any).watcher.subscribe(onChange);

    /**
     * Configures the response for an event stream connection.
     */
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