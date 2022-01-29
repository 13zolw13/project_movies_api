FROM node:14.15-alpine

WORKDIR  /auth

COPY ./package*.json ./
RUN npm install


COPY ./ ./
CMD ["node", "./src/server.js"]