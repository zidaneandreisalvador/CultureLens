# Use official PHP image
FROM php:8.2-apache

# Set working directory inside the container
WORKDIR /var/www/html

# Copy everything from your repo into the container
COPY . /var/www/html/

# Set document root to CultureLens_API (where your code is)
WORKDIR /var/www/html/CultureLens_API

# Enable mysqli for MySQL connection
RUN docker-php-ext-install mysqli

# Expose Render's port
EXPOSE 10000

# Start the PHP built-in server pointing to CultureLens_API
CMD ["php", "-S", "0.0.0.0:10000", "-t", "/var/www/html/CultureLens_API"]
