#!/bin/bash

echo "========================================"
echo "   MineGuard AI Backend Server"
echo "========================================"
echo

echo "Checking Python installation..."
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.7 or higher"
    exit 1
fi

echo "Python found: $(python3 --version)"
echo

echo "Navigating to backend directory..."
cd backend

echo "Installing required packages..."
pip3 install -r requirements.txt

echo
echo "Starting AI Backend Server..."
echo "Server will be available at: http://localhost:5000"
echo
echo "Press Ctrl+C to stop the server"
echo

python3 app.py
