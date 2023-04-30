FROM node:12.22.12

LABEL authors="jinxuan-owyong"

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "."]
