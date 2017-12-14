#!/bin/sh
docker-compose down
docker-compose -f docker-compose.yml -f docker-compose-test.yml pull && docker-compose up -d --build
docker-compose -f docker-compose.yml -f docker-compose-test.yml run tests
docker-compose down
