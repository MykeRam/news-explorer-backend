# News Explorer API

Express and MongoDB backend for the TripleTen News Explorer final project. Provides JWT authentication and saved-article storage with ownership protection.

## Deployed API

**Base URL:** https://api.news-explorer-mykeram.mooo.com

`GET /` returns `200` and:

```json
{ "message": "News Explorer API is running" }
```

HTTP requests redirect to HTTPS. Nginx proxies requests to the Node.js application on `127.0.0.1:3000`. Let's Encrypt certificates are managed by Certbot with scheduled renewal.

## Run locally

Install Node.js, npm, and MongoDB, then clone this repository and install dependencies:

```bash
npm ci
```

Create a `.env` file in the repository root:

```dotenv
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/news-explorer
JWT_SECRET=replace-with-a-random-secret
```

Start MongoDB before starting the API. Generate your own JWT secret, for example with `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`. Keep `.env` private; environment files and logs are ignored by Git.

```bash
npm run dev  # Development with automatic restart
npm start    # Run without automatic restart
npm run lint
```

Production uses `NODE_ENV=production` and requires a `JWT_SECRET`. The MongoDB connection is configured with `MONGODB_URI`; `PORT` defaults to `3000`.

## Endpoints

Request bodies use JSON. Protected endpoints require `Authorization: Bearer <token>`, using the token returned by sign-in.

| Method | Path | Authentication | Description |
| --- | --- | --- | --- |
| GET | `/` | Public | API health message |
| POST | `/signup` | Public | Register with `email`, `password`, and `name` |
| POST | `/signin` | Public | Sign in with `email` and `password`; returns a JWT |
| GET | `/users/me` | Required | Return the current user's email and name |
| GET | `/articles` | Required | List the current user's saved articles |
| POST | `/articles` | Required | Save an article for the current user |
| DELETE | `/articles/:articleId` | Required | Delete an article owned by the current user |

An article requires `keyword`, `title`, `text`, `date`, `source`, `link`, and `image`. Both URL fields must use HTTP or HTTPS. Passwords must contain at least eight characters; names must contain 2–30 characters. Passwords are hashed before storage and excluded from API responses.

Responses use `200` or `201` for success, `400` for invalid input, `401` for missing or invalid authentication, `403` for another user's article deletion, `404` for missing resources, `409` for duplicate registration, and `429` when the rate limit is reached. Unexpected errors return a generic `500` response.

Celebrate validation errors include a `validation` object identifying the affected request segment, field names, and validation message. Other errors return `{ "message": "..." }`. Controllers and authentication middleware forward errors to the centralized handler using custom error classes. Database and JSON parsing errors are normalized before handling, and error logging runs separately before Celebrate's `errors()` middleware and the final response handler.

## Security middleware

Helmet sets security-related HTTP headers and removes `X-Powered-By`. The rate limiter is configured separately in `middlewares/rateLimiter.js` and allows 100 requests per client IP per 15 minutes. Blocked requests return JSON with status `429`, rate-limit headers, and a `Retry-After` header.

The application trusts only loopback proxies, matching Nginx forwarding locally to `127.0.0.1:3000`. Client addresses are derived from that trusted proxy chain, so users do not all share Nginx's rate-limit counter. The default in-memory rate-limit store is intended for this single-process deployment; counters reset on restart. A shared store would be needed for multiple application processes.

## Production operation

The API is deployed on a Google Cloud Debian VM. MongoDB listens locally on port `27017`. The `news-explorer` systemd service runs the API and starts after reboots. Nginx handles public HTTP/HTTPS traffic.

On the VM, use:

```bash
sudo systemctl status news-explorer --no-pager
sudo journalctl -u news-explorer -n 50 --no-pager
sudo nginx -t
sudo certbot renew --dry-run
```

After deploying dependency or application changes, install production dependencies with `npm ci --omit=dev`, restart with `sudo systemctl restart news-explorer`, and check the health endpoint.

Requests and errors are recorded as JSON in `request.log` and `error.log`. Logging excludes request bodies and authorization headers.

## Deployment verification

Verified on October 17, 2026:

- Public HTTPS health response and HTTP-to-HTTPS redirect.
- Successful Certbot renewal dry run.
- Twenty live API checks covering registration, duplicate registration, sign-in, invalid credentials/JWTs, protected routes, profile responses, article validation, article creation/listing/deletion, ownership protection, and missing articles.
- Test articles and both temporary test accounts were removed after verification.

Frontend integration and CORS configuration are separate follow-up work for Stage 3.
