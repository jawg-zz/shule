#!/bin/sh
set -e

echo "=== Shule School Management System ==="
echo "Generating Prisma client..."
npx prisma generate

echo "Pushing database schema..."
npx prisma db push --accept-data-loss

echo "Seeding database..."
npx prisma db seed || echo "Seed skipped (data may already exist)"

echo "Starting application..."
exec node server.js
