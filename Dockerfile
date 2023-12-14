FROM node:16.13.2-alpine3.15

WORKDIR /elasticproxy

ENV APP_NAME paatokset-elasticproxy
ENV npm_config_cache=/app/.npm

COPY package*.json ./
RUN npm install && npm cache clean --force  

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
