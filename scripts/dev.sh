#!/bin/bash

echo "🚀 KARGA NOT Development Servers Starting..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# Start backend
echo "🔧 Starting Backend API..."
cd apps/api
npm run start:dev &
BACKEND_PID=$!
cd ../..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Frontend..."
cd apps/web
npm run dev &
FRONTEND_PID=$!
cd ../..

echo ""
echo "=============================================="
echo "✅ Servers are running!"
echo "=============================================="
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:4000/api"
echo "📚 Docs:     http://localhost:4000/api/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo "=============================================="
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
