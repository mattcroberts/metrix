FROM node:12-slim

WORKDIR /home/nodejs/app
RUN chown node:node .
USER node

COPY --chown=node:node . .

RUN yarn

RUN yarn build

FROM nginx:latest

COPY --from=0 /home/nodejs/app/build /usr/share/caddy