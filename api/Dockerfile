FROM alpine:3.5

MAINTAINER Parpe <admin@parpe.com>

# Install packages from testing repo's
RUN apk -U update
RUN apk --no-cache add git curl openssh-client zlib \
    nodejs nodejs-npm \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/main/ \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/testing/ \
    --repository http://dl-cdn.alpinelinux.org/alpine/edge/community

# Copying Code
RUN mkdir -p /var/bionexo-api
WORKDIR /var/bionexo-api
COPY src src
COPY test test
COPY .babelrc package.json package-lock.json server.js .env.default ./

# Installing everything
RUN npm install
RUN npm run build

# Prepares .env file before lifting off
RUN mv .env.default .env

EXPOSE 3000
CMD ["npm", "run", "start"]