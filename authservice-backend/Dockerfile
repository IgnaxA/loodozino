
FROM node:21
WORKDIR app

COPY src ./

RUN npm i
RUN npm run build

CMD ["npm", "run", "prod"]
