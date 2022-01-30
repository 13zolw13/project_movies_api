FROM node:14.15-alpine
WORKDIR  /
COPY ./package*.json ./
RUN npm install


COPY ./ ./


CMD ["node", "/src/app.ts"]