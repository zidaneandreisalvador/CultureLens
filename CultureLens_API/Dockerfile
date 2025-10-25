# Use an official PHP image
FROM php:8.2-apache

# Copy all your code into the container
COPY . /var/www/html/

# Enable mysqli extension for MySQL
RUN docker-php-ext-install mysqli

# Expose Render’s port
EXPOSE 10000

# Start the built-in server
CMD ["php", "-S", "0.0.0.0:10000", "-t", "/var/www/html"]
