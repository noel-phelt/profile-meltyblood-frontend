FROM node:16.15.0-alpine3.14

WORKDIR /var/www
RUN apk update && \
    yarn global add create-nuxt-app

COPY .src/package*.json ./
RUN yarn install

COPY ./src ./
RUN yarn build