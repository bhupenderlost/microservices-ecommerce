FROM node:18

WORKDIR /

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["node", "app.js"]