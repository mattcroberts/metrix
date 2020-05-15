FROM node:12-slim

ENV PUBLIC_URL /metrix
ENV REACT_APP_BASENAME /metrix
ENV REACT_APP_API_PATH /metrix/api

WORKDIR /home/nodejs/app
RUN chown node:node .
USER node

COPY --chown=node:node . .

RUN yarn

ENV NODE_ENV production

RUN yarn build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /home/nodejs/app/build /usr/share/nginx/html