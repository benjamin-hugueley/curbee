import { app, config } from '../core/_index';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import { HttpRequest, HttpResponse } from '@benjamin-hugueley/magic';

/**
 * Handles file requests by resolving paths and serving static files.
 */
function files(): void {
  app.get('*', (req: HttpRequest, res: HttpResponse) => {
    const requestUrl = req.url ?? '/';
    const host = req.headers.host ?? 'localhost';
    const url = new URL(requestUrl, `http://${host}`);
    const { pathname } = url;

    /**
     * Redirects requests for the index page to a 404 response.
     */
    if (pathname === '/index' || pathname === '/index.html') {
      return res.send({ body: join(config.PUBLIC_DIR, '404.html'), status: 404 });
    }

    /**
     * Resolves the requested file name based on the URL path.
     * If the request is for a directory, it assumes an HTML file.
     */
    const resolvedName =
      pathname === '/'
        ? 'home.html'
        : !pathname.includes('.')
        ? `${pathname.split('/').filter(Boolean).pop()}.html`
        : pathname;

    const baseDir = config.PUBLIC_DIR;
    const fullPath = join(baseDir, resolvedName);

    /**
     * Determines if the requested file exists; if not, serves a 404 page.
     */
    const filePath = existsSync(fullPath)
      ? fullPath
      : join(baseDir, '404.html');

    const status = filePath.endsWith('404.html') ? 404 : 200;

    /**
     * Sends the resolved file path along with appropriate headers.
     */
    res.send({
      body: filePath,
      status: status,
      headers: {
        'Content-Type': config.MIME_TYPES[extname(filePath)],
        'Cache-Control': 'public, max-age=0, s-maxage=86400, must-revalidate'
      }
    });
  });
}

export { files };