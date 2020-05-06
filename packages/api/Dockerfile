FROM node:12-slim

WORKDIR /home/nodejs/app
RUN chown node:node .
USER node

COPY --chown=node:node . .

RUN yarn

RUN yarn build


ENV NODE_ENV=production

RUN yarn

EXPOSE 4000

CMD [ "yarn", "start" ]