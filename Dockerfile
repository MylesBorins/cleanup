FROM node:12-alpine
copy . .
RUN npm ci --production
CMD npm start
