#!/bin/bash

# Dynamically set port in Nginx config based on environment variable (required for Railway/Render)
if [ -n "$PORT" ]; then
    echo "Configuring Nginx to listen on port: $PORT"
    sed -i "s/listen 80/listen ${PORT}/g" /etc/nginx/nginx.conf
fi

# Run database migrations automatically on start
echo "Running database migrations..."
php artisan migrate --force

# Start Supervisord
echo "Starting supervisor services (PHP-FPM + Nginx)..."
exec /usr/bin/supervisord -c /etc/supervisord.conf
