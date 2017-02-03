FROM node:6
copy . .
RUN npm install --production
RUN touch cleanup.log && touch out.log && touch err.log
CMD npm start && tail -f /out.log
