# Node.js 이미지를 사용합니다.
FROM node:alpine AS backend

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
