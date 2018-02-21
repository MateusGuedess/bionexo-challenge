FROM node:7.7.2

ADD . /code

WORKDIR /code

RUN npm install -g less
RUN npm install
RUN npm run build:css

EXPOSE 3000

CMD npm start