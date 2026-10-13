A web application that helps users find available medicines at nearby pharmacies, check prices and stock, make reservations, and receive availability notifications. Pharmacy staff can manage inventory and reservations, while administrators can manage users, pharmacies, medicines, and system activities.

## Authentication development setup

The repository now includes a PostgreSQL-backed authentication API under `server/`. Follow [server/README.md](server/README.md) to configure PostgreSQL, run Prisma migrations, and start the API. Start the Vite client separately from `client/`.

The current phase implements registration, login, session persistence, logout, and protected-route checks. Medicine, pharmacy, reservation, notification, and dashboard APIs remain future phases.
