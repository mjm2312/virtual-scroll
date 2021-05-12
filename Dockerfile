FROM node:12

#RUN mkdir -p /client
#RUN mkdir -p /client/server

COPY /server /server
COPY /client /client
COPY /webpack.config.js /

WORKDIR /

COPY ./package*.json ./
RUN npm install --production

#EXPOSE 3000

RUN npm run build

WORKDIR /
CMD ["node", "/server/index.js"] 