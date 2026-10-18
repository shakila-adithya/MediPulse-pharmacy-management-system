
# Node.js environment
FROM node:22-bookworm-slim

# Set working directory
WORKDIR /app

# Install dependencies required by Prisma
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy Prisma schema and migrations
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy application source
COPY src ./src

# Document the backend port
EXPOSE 4000

# Start MediPulse backend
CMD ["npm", "start"]
