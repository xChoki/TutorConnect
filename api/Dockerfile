FROM node:18.17

RUN npm i -g nodemon
RUN npm install -g pnpm
RUN mkdir -p /api
COPY . /api

WORKDIR /api

RUN pnpm install

EXPOSE 4000

CMD ["nodemon", "index.js"]