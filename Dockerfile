FROM node:8-alpine
copy . .
RUN npm i -g npm
RUN npm ci --production
RUN touch cleanup.log && touch out.log && touch err.log
CMD npm start && tail -f /out.log
