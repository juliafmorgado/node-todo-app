FROM node:lts

WORKDIR /index

COPY package.json /index
COPY package-lock.json /index

RUN npm ci

COPY . /index

EXPOSE 3000

ARG DB_CONNECT

CMD [ "npm", "start" ]