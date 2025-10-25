FROM php:8.2-apache

WORKDIR /var/www/html

# Copy contents of CultureLens_API into the container
COPY CultureLens_API/ .

RUN docker-php-ext-install mysqli

EXPOSE 10000

CMD ["php", "-S", "0.0.0.0:10000", "-t", "/var/www/html"]

