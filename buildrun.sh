#!/bin/sh
#sudo apt-get install -y docker docker-compose
#sudo npm install -g nodemon
clear;
./fakeversion.sh
yarn install
yarn setup
nodemon start
