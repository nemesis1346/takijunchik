#!/bin/bash

BASEDIR=$(cd $(dirname $0); pwd)
echo $BASEDIR
cd $BASEDIR/../nodejs-firebase

sudo npx sequelize-cli db:migrate:undo --env=production
sudo npx sequelize-cli db:drop --env=production
sudo npx sequelize-cli db:create --env=production
sudo npx sequelize-cli db:migrate --env=production
sudo npx sequelize-cli db:seed:all --env=production
