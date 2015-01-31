#!/bin/bash

if [ $# != 1 ]; then
  echo "Usage: $0 <crendetials>"
  echo "For example: $0 username@server.com"
  exit 1
fi

SERVER=$1
DEPLOYMENT_PATH=$SERVER:/wwwroot/melindajamikko.fi

meteor build --architecture os.linux.x86_64 build
scp -C build/mm.tar.gz $DEPLOYMENT_PATH
rm build/mm.tar.gz
scp -C settings.json $DEPLOYMENT_PATH
ssh $SERVER 'bash -s' < deploy/serverSideDeploy.sh
