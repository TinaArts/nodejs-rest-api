FROM node:8

WORKDIR /var/www/app

RUN mkdir -p /var/www/app
COPY package.json /var/www/app

RUN npm install nodemon -g
RUN npm install --quiet

COPY . /var/www/app

EXPOSE 8081

#CMD [ "npm", "watch" ]

