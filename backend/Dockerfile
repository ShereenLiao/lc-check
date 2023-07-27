FROM node:19.7.0-alpine

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 5050
CMD [ "npm" , "start"]
