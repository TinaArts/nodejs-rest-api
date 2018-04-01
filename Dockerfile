FROM node:8

RUN apt-get update -yq && apt-get upgrade -yq && \
    apt-get install -yq curl git ssh
RUN apt-get -q -y install nodejs npm build-essential
RUN ln -s "$(which nodejs)" /usr/bin/node

RUN mkdir -p /var/www/app
WORKDIR /var/www/app
COPY package.json /var/www/app

RUN npm install nodemon -g
RUN npm install

COPY . /var/www/app

EXPOSE 8081

#CMD [ "npm", "watch" ]

