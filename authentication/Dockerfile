FROM node:14.15-alpine

WORKDIR  /app
COPY ./ ./

COPY ./package*.json ./
RUN npm install


CMD ["node", "./src/server.js"]