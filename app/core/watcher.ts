import { watch, FSWatcher } from 'fs';

type WatcherCallback = (event: string, filePath: string) => void;

/**
 * Creates a file system watcher for monitoring changes within a directory.
 *
 * @param directory - The directory to watch for file changes.
 * @returns An object with methods to subscribe, unsubscribe, and close the watcher.
 */
function watcher(directory: string) {
  /** Stores all subscribed callback functions. */
  const subscribers: Set<WatcherCallback> = new Set();

  /** Initializes the file system watcher instance. */
  const watcherInstance: FSWatcher = watch(
    directory,
    { recursive: true, encoding: "utf8" },
    (event: string, filePath: string | Buffer | null) => {
      if (filePath && typeof filePath === 'string') {
        console.log('File change detected:', filePath);
        /** Notifies all subscribed callbacks about the file change. */
        for (const callback of subscribers) {
          callback(event, filePath);
        }
      }
    }
  );

  return {
    /**
     * Subscribes a callback function to listen for file changes.
     *
     * @param callback - The function to be called on a file change event.
     */
    subscribe(callback: WatcherCallback) {
      subscribers.add(callback);
    },

    /**
     * Unsubscribes a callback function from listening to file changes.
     *
     * @param callback - The function to remove from the subscriber list.
     */
    unsubscribe(callback: WatcherCallback) {
      subscribers.delete(callback);
    },

    /**
     * Closes the watcher instance, stopping file change monitoring.
     */
    close() {
      watcherInstance.close();
    }
  };
}

export { watcher };