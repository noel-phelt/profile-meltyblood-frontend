FROM node:20-alpine

WORKDIR /var/www
RUN apk update && \
    yarn global add create-nuxt-app

# アプリケーションのビルド
COPY ./src/package.json ./src/yarn.lock ./
# CSSNano v7 (Node 20+) と PostCSS Nesting v8 (Node 16-) の競合を回避するため ignore-engines を使用
RUN yarn install --ignore-engines

COPY ./src ./
RUN yarn build

# Cloud Run 向けの設定
ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]