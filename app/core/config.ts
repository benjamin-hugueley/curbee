import { join } from 'path';

/**
 * Defines the configuration structure for the application.
 */
interface Config {
  /** The environment in which the application is running. */
  ENVIRONMENT: string;

  /** The public directory for serving static files. */
  PUBLIC_DIR: string;

  /** Supported HTTP methods. */
  HTTP_METHODS: string[];

  /** Security headers applied to all HTTP responses. */
  SECURITY_HEADERS: Record<string, string>;

  /** MIME type mappings for file extensions. */
  MIME_TYPES: Record<string, string>;
}

/**
 * Application configuration settings.
 */
const config: Config = {
  ENVIRONMENT: process.env.ENVIRONMENT ?? 'local',
  PUBLIC_DIR: process.env.PUBLIC_DIRECTORY ?? join(process.cwd(), 'site'),
  HTTP_METHODS: [
    'GET', 'HEAD', 'POST', 'PUT',
    'PATCH', 'DELETE', 'OPTIONS',
    'TRACE', 'CONNECT'
  ],
  SECURITY_HEADERS: {
    'cross-origin-opener-policy': 'same-origin',
    'cross-origin-resource-policy': 'same-origin',
    'origin-agent-cluster': '?1',
    'x-dns-prefetch-control': 'off',
    'expect-ct': 'enforce, max-age=86400',
    'x-content-type-options': 'nosniff',
    'strict-transport-security': 'max-age=63072000; includeSubDomains; preload',
    'x-frame-options': 'DENY',
    'x-permitted-cross-domain-policies': 'none',
    'referrer-policy': 'no-referrer',
    'permissions-policy':
      'geolocation=(),camera=(self),microphone=(self),payment=(),fullscreen=(),usb=(),' +
      'clipboard-read=(),clipboard-write=(),accelerometer=(),gyroscope=(),' +
      'magnetometer=(),autoplay=()',
    'content-security-policy':
      "default-src 'none'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; " +
      "img-src 'self'; font-src 'self' https://fonts.gstatic.com; connect-src 'self'; frame-ancestors 'none'; " +
      "form-action 'none'; base-uri 'none'; object-src 'none'; manifest-src 'self'; " +
      "media-src 'none'; worker-src 'none'; block-all-mixed-content",
    'cache-control': 'private, no-cache'
  },
  MIME_TYPES: {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain',
    '.pdf': 'application/pdf',
    '.zip': 'application/zip',
    '.csv': 'text/csv'
  }
};

/**
 * Enhances security headers for non-local environments.
 */
if (config.ENVIRONMENT !== 'local') {
  config.SECURITY_HEADERS['content-security-policy'] += '; upgrade-insecure-requests';
}

export { config };