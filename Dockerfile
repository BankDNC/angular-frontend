FROM node:18.14-alpine AS build-env

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

FROM nginx:stable-alpine

COPY --from=build-env /app/dist/angular-frontend/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
