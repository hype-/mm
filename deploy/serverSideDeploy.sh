#!/bin/bash

DIRECTORY=/wwwroot/melindajamikko.fi
ROOT_URL=http://melindajamikko.fi:3000
DATABASE_NAME=melindajamikkofi
PROCESS_NAME="melindajamikko.fi"

cd $DIRECTORY

SETTINGS=$(cat settings.json)

rm -rf bundle
tar zxvf mm.tar.gz
cd bundle
(cd programs/server && npm install)
pm2 stop $PROCESS_NAME
METEOR_SETTINGS=$SETTINGS PORT=3000 ROOT_URL=$ROOT_URL MONGO_URL=mongodb://localhost:27017/$DATABASE_NAME pm2 start main.js --name $PROCESS_NAME

echo "Deployed!"
