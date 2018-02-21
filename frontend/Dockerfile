FROM node:7.7.2

ADD . /code

WORKDIR /code

RUN npm install
RUN npm run build:css

EXPOSE 8000

CMD npm start