FROM node:14.15-alpine
WORKDIR  /movies
COPY ./package*.json ./
RUN npm install


COPY ./ ./


CMD ["npm", "run dev"]