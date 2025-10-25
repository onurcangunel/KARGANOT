#!/bin/bash
# YÖK ATLAS Python API Starter Script

echo "🚀 Starting YÖK ATLAS Python API..."

# Virtual environment oluştur (eğer yoksa)
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Virtual environment'ı aktifle
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Dependencies kur
echo "📚 Installing dependencies..."
pip install -r requirements.txt

# API'yi başlat
echo "✅ Starting FastAPI server on http://localhost:8000"
python main.py