FROM node:18.17

RUN npm i -g nodemon
RUN mkdir -p /api
COPY . /api

WORKDIR /api

RUN npm install

EXPOSE 4000

CMD ["nodemon", "index.js"]