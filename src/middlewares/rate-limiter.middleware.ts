import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOWS_MS } from '@/config';
import rateLimiter from 'express-rate-limit';

const limiter = rateLimiter({
  max: RATE_LIMIT_MAX,
  windowMs: RATE_LIMIT_WINDOWS_MS,
  message: "You can't make any more requests at the moment. Try again later",
});
export { limiter };
