FROM node:18-alpine AS build

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json /app/

RUN npm install

ARG REACT_APP_REPLICA_NUM

ENV REACT_APP_REPLICA_NUM $REACT_APP_REPLICA_NUM

COPY . /app

RUN npm run build

FROM nginx:alpine

WORKDIR /usr/local/bin

COPY --from=build /app/dist /usr/share/nginx/html

COPY generate-config.sh .

RUN chmod +x generate-config.sh

EXPOSE 80

ENTRYPOINT [ "/bin/sh", "generate-config.sh" ]
