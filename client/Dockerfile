FROM node:18.17 
WORKDIR /client 
COPY ./package.json . 
RUN npm i 
COPY . /client
EXPOSE 5173 
CMD ["npm", "run", "dev"]