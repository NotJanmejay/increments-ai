#!/bin/bash

LOG_FILE="server.logs"

# Redirect stdout (>) and stderr (2>) to the log file
exec > >(tee -a "$LOG_FILE") 2>&1

echo "Make migrations"
python manage.py makemigrations api
python manage.py makemigrations 
python manage.py migrate api
python manage.py migrate

echo "Running Server"
python manage.py runserver
