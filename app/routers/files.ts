import { app, config } from '../core/_index';
import { extname, join } from 'path';
import { existsSync } from 'fs';
import { HttpRequest, HttpResponse } from '@benjamin-hugueley/magic';

function files(): void {
  app.get('*', (req: HttpRequest, res: HttpResponse) => {
    const requestUrl = req.url ?? '/';
    const host = req.headers.host ?? 'localhost';
    const url = new URL(requestUrl, `http://${host}`);
    const { pathname } = url;
    if (pathname === '/index' || pathname === '/index.html') {
      return res.send({body: join(config.PUBLIC_DIR, '404.html'), status: 404});
    }
    const resolvedName =
      pathname === '/'
        ? 'home.html'
        : !pathname.includes('.')
        ? `${pathname.split('/').filter(Boolean).pop()}.html`
        : pathname;
    const baseDir = config.PUBLIC_DIR;
    const fullPath = join(baseDir, resolvedName);
    const filePath = existsSync(fullPath)
      ? fullPath
      : join(baseDir, '404.html');
    const status = filePath.endsWith('404.html') ? 404 : 200;
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