import { watch, FSWatcher } from 'fs';

type WatcherCallback = (event: string, filePath: string) => void;

function watcher(directory: string) {
  const subscribers: Set<WatcherCallback> = new Set();

  const watcherInstance: FSWatcher = watch(
    directory,
    { recursive: true, encoding: "utf8" },
    (event: string, filePath: string | Buffer | null) => {
      if (filePath && typeof filePath === 'string') {
        console.log('File change detected:', filePath);
        for (const callback of subscribers) {
          callback(event, filePath);
        }
      }
    }
  );

  return {
    subscribe(callback: WatcherCallback) {
      subscribers.add(callback);
    },
    unsubscribe(callback: WatcherCallback) {
      subscribers.delete(callback);
    },
    close() {
      watcherInstance.close();
    }
  };
}

export { watcher };