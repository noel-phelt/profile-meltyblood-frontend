FROM node:16.15.0-alpine3.14

WORKDIR /var/www
RUN apk update && \
    yarn global add create-nuxt-app

# 開発環境ではビルド時にinstallしない（起動後にボリューム経由で実行）
COPY ./src/package*.json ./

EXPOSE 3000
EXPOSE 24678

# commandはdocker-compose.yml側で制御