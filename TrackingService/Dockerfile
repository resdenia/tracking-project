FROM node:alpine

WORKDIR /usr/app
COPY package.json ./
RUN npm install

COPY . .

EXPOSE 4010

CMD [ "node", "index.js" ]
