FROM node:14.15-alpine

WORKDIR  /auth
COPY ./ ./

# COPY ./package*.json ./
RUN npm install


CMD ["node", "./src/server.js"]