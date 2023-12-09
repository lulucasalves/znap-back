FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

ENV DEV=false

CMD ["sh", "-c", "npm run build && npm start"]
