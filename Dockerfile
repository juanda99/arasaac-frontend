FROM nginx:1.23.4-bullseye
LABEL maintainer="juandacorreo@gmail.com"


# Install dependencies
COPY ./build /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
