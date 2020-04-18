FROM arm32v7/node:12.13.0 as build

ARG STROOPED_API_HOST

WORKDIR /srv/app

COPY ./src/ ./src/
COPY ./public/ ./public/
COPY webpack/ ./webpack/
COPY server.js .
COPY package* ./
COPY .babelrc .
COPY .stylelintrc .
COPY .eslintrc.js .
COPY .eslintignore .

# Remove any source maps from dist folder
RUN npm install

RUN NODE_ENV=production npm run build:prod

FROM arm32v7/node:12.13.0-alpine as production

WORKDIR /srv/app

COPY server.js .
COPY package* ./
COPY --from=build /srv/app/dist dist/

RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install --production \
    && apk del .gyp

USER node
EXPOSE 3000

CMD ["node", "server.js"]
