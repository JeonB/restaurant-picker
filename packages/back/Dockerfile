# Node.js 이미지를 사용합니다.
FROM node:alpine AS back

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
