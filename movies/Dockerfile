FROM node:14.15-alpine
WORKDIR  /
COPY ./package*.json ./
RUN npm install
RUN npx tsc 




CMD ["npm", "run dev"]