# Use the official PHP image with Apache
FROM php:8.2-apache

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy all files from the CultureLens_API folder into the web root
COPY CultureLens_API/ /var/www/html/

# Enable MySQLi extension
RUN docker-php-ext-install mysqli

# Expose the port used by Render
EXPOSE 10000

# Start PHP built-in server on Render
CMD ["php", "-S", "0.0.0.0:10000", "-t", "/var/www/html"]
