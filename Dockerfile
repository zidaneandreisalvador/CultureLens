# Use PHP with Apache
FROM php:8.2-apache

# Set the working directory inside the container
WORKDIR /var/www/html

# Copy all files from CultureLens_API folder to the web root
COPY CultureLens_API/ /var/www/html/

# Enable MySQLi
RUN docker-php-ext-install mysqli

# Expose Render's port
EXPOSE 10000

# Start the PHP built-in server
CMD ["php", "-S", "0.0.0.0:10000", "-t", "/var/www/html"]

