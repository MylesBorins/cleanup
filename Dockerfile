FROM node:10-alpine
copy . .
RUN npm ci --production
RUN touch {cleanup,out,err}.log
CMD npm start && tail -f /out.log
