import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames; /wa/* are the QR redirects
  matcher: ['/((?!.*\\..*|_next|favicon.ico|wa/).*)']
};
