#!/bin/bash

echo "🚀 Setting up KARGA NOT..."

# Check if .env exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file..."
  cp .env.example .env
  echo "✅ .env created. Please update with your values."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for database
echo "⏳ Waiting for database..."
sleep 5

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
cd apps/api
npx prisma generate

# Run migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed

cd ../..

echo "
✅ Setup complete!

📝 Next steps:
1. Update .env file with your configuration
2. Run 'npm run dev' to start development servers

Frontend: http://localhost:3000
Backend: http://localhost:4000
API Docs: http://localhost:4000/api/docs
Mailhog: http://localhost:8025
MinIO: http://localhost:9001

Happy coding! 🎉
"
