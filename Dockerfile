
FROM node:21
WORKDIR app

COPY . .

RUN npm i
RUN npm run build

CMD ["npm", "run", "prod"]
