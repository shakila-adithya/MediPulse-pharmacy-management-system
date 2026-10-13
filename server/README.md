# MediPulse API

## Local setup

1. Install PostgreSQL and create a database named `medipulse`.
2. Copy `.env.example` to `.env` and set `DATABASE_URL` and a long random `SESSION_SECRET`.
3. From `server/`, run `npm install`.
4. Generate the Prisma client with `npm run prisma:generate`.
5. Apply the database migration with `npx prisma migrate deploy` (use `npm run prisma:migrate` during development).
6. Start the API with `npm run dev`.

The API listens on `http://localhost:4000` by default. The Vite development server proxies `/api` to it.

## Endpoints

- `GET /api/v1/health`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `POST /api/v1/auth/logout`

Sessions use an opaque, hashed token stored in PostgreSQL and an HttpOnly cookie. Passwords are stored only as bcrypt hashes. Public registration supports customer and pharmacy accounts; pharmacy accounts start as `PENDING_APPROVAL`. Admin accounts must be created through a future controlled administration flow.

## Frontend

From `client/`, run `npm run dev`. The client uses the existing authentication pages and sends credentials with requests. Medicine and pharmacy discovery remain mock-data features until their API phase.

## Troubleshooting

- `P1001` or connection errors: verify PostgreSQL is running and `DATABASE_URL` is correct.
- `401 Authentication required`: verify the browser accepts cookies and that the client origin matches `CLIENT_ORIGIN`.
- CORS errors: start the frontend at `http://localhost:5173` or update `CLIENT_ORIGIN`.
