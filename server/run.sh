#!/bin/bash

# Check if a virtual environment folder exists, if not, create one
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
fi

# Activate the virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install the required packages from requirements.txt
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies from requirements.txt..."
    pip install -r requirements.txt
else
    echo "requirements.txt not found!"
    exit 1
fi

# Ensure .env file exists and contains OPENAI_API_KEY
if [ ! -f ".env" ]; then
    echo ".env file not found. Creating one..."
    touch .env
fi

# Check if OPENAI_API_KEY exists in the .env file
if ! grep -q "OPENAI_API_KEY" .env; then
    echo "OPENAI_API_KEY not found in .env. Please add your API key."
    echo "OPENAI_API_KEY=" >> .env
    exit 1
fi

# Remove existing migration files for the 'api' app
echo "Removing existing migrations for 'api' app..."
find ./api/migrations/ -name "*.py" ! -name "__init__.py" -delete

# Run Django migrations for a clean start
echo "Making migrations and running Django migrations for 'api' app..."
python manage.py makemigrations api
python manage.py migrate api

# Start the Django development server
echo "Starting Django server..."
python manage.py runserver
