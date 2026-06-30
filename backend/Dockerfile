FROM php:8.2-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    bash \
    postgresql-dev \
    libzip-dev

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql pdo_pgsql bcmath gd zip

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy codebase
COPY . .

# Install dependencies
RUN composer install --no-interaction --no-dev --optimize-autoloader

# Setup storage and cache directories and permissions
RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache bootstrap/cache && \
    chown -R www-data:www-data storage bootstrap/cache && \
    chmod -R 775 storage bootstrap/cache

# Copy Configuration files
COPY nginx.conf /etc/nginx/nginx.conf
COPY supervisord.conf /etc/supervisord.conf

# Setup Entrypoint Script
RUN chmod +x entrypoint.sh

# Expose port (Internal default, will be overridden by Entrypoint on cloud providers)
EXPOSE 80

ENTRYPOINT ["/var/www/entrypoint.sh"]
