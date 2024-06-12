FROM node:21-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

RUN apk add --no-cache xdg-utils

RUN yarn config set network-timeout 600000 -g

COPY . .

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN yarn build


FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf index.html
RUN mv src/index.html index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
