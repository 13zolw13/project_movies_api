FROM node:14.15-alpine

WORKDIR  /
COPY ./package*.json ./
RUN npm install
COPY ./ ./

EXPOSE 3000
CMD ["node", "./src/server.js"]