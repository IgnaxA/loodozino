FROM node:21
WORKDIR app

COPY . .

RUN npm i

CMD ["npm", "run", "start"]