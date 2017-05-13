FROM node:6-alpine
HEALTHCHECK CMD curl -f http://localhost:1337/ || exit 1
copy . .
RUN npm install --production
RUN touch cleanup.log && touch out.log && touch err.log
CMD npm start && tail -f /out.log
