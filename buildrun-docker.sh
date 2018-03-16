#!/bin/sh
#sudo apt-get install -y docker docker-compose
# npm i yarn -g
clear;
./fakeversion.sh
yarn install
yarn setup
docker-compose pull
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build
