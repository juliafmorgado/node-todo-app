FROM node:lts

WORKDIR /index

COPY package.json /index
COPY package-lock.json /index

RUN npm ci

COPY . /index

EXPOSE 8888

ARG DB_CONNECT

CMD [ "npm", "start" ]
