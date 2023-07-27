FROM node:19.7.0-alpine

WORKDIR /usr/src/frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm" , "start"]
