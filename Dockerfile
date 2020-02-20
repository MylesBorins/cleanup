FROM node:12
WORKDIR /app
COPY . .
RUN npm ci --production
CMD ["node", "server.js"]
