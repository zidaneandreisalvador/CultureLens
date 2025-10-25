# Use the official PHP image with Apache
FROM php:8.2-apache

# Set working directory inside the container
WORKDIR /var/www/html

# Copy the entire CultureLens_API folder into the container
COPY CultureLens_API/ /var/www/html/

# Enable mysqli for MySQL database connection
RUN docker-php-ext-install mysqli

# Expose Render's port
EXPOSE 10000

# Start PHP built-in server (Render expects this)
CMD ["php", "-S", "0.0.0.0:10000", "-t", "/var/www/html"]
