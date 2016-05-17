FROM node:4
copy . .
RUN npm install
RUN touch cleanup.log && touch out.log && touch err.log
CMD npm start && tail -f /out.log
