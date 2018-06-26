FROM node:8-alpine
HEALTHCHECK CMD curl -f http://localhost:1337/ || exit 1
copy . .
RUN npm i -g npm
RUN npm ci --production
RUN touch cleanup.log && touch out.log && touch err.log
CMD npm start && tail -f /out.log
