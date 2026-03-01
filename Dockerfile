FROM node:20-alpine

WORKDIR /var/www
RUN apk update && \
    yarn global add create-nuxt-app

# アプリケーションのビルド
COPY ./src/package.json ./src/yarn.lock ./
RUN yarn install

COPY ./src ./
RUN yarn build

# Cloud Run 向けの設定
ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]