FROM node:16.3.0-alpine AS prod

WORKDIR /app

COPY package.json /app

RUN npm install -g npm@8

RUN npm cache clean --force

RUN npm install

RUN npm install esbuild vite

COPY . /app

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=prod /app/dist /usr/share/nginx/html

COPY generate-config.sh .

RUN chmod +x generate-config.sh

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "generate-config.sh"]