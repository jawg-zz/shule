#!/bin/sh
set -e

echo "============================================"
echo "  Shule School Management System"
echo "============================================"

# Validate required env vars
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set"
  exit 1
fi

if [ -z "$NEXTAUTH_SECRET" ]; then
  echo "ERROR: NEXTAUTH_SECRET is not set"
  exit 1
fi

if [ -z "$NEXTAUTH_URL" ]; then
  echo "ERROR: NEXTAUTH_URL is not set"
  exit 1
fi

# Generate Prisma client first
echo "Generating Prisma client..."
npx prisma generate

# Wait for database
echo "Waiting for database..."
MAX_RETRIES=30
RETRY_INTERVAL=2
RETRY_COUNT=0
until npx prisma db push --accept-data-loss --skip-generate 2>/dev/null || [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "Database not ready yet... (attempt $RETRY_COUNT/$MAX_RETRIES)"
  sleep "$RETRY_INTERVAL"
done

if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
  echo "ERROR: Database connection timeout. Check DATABASE_URL and ensure PostgreSQL is running."
  exit 1
fi

# Push schema
echo "Applying database schema..."
npx prisma db push --accept-data-loss

# Seed if no admin user exists
echo "Checking for existing data..."
if node -e "const{PrismaClient}=require('@prisma/client');new PrismaClient().user.findUnique({where:{email:'admin@shule.ac.ke'}}).then(u=>process.exit(u?0:1))" 2>/dev/null; then
  echo "Database already contains data — skipping seed"
else
  echo "Seeding database with initial data..."
  npx prisma db seed || echo "Warning: Seed encountered issues (may be OK if data exists)"
fi

echo "Starting application..."
exec node server.js
