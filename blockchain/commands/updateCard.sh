#!/bin/bash

# The source command can be used to load any functions file into the current shell script or a command prompt.
# Returns tinkunakuyVer and tinkunakuyBNA
source ./getLatestBnaAndVer.sh

echo "Using version number: $tinkunakuyNewVer"
echo "Using bna file: $tinkunakuyNewBNA"

# Testing dynamically updating package.json file, think it works.
# http://linuxsay.com/t/how-to-update-an-value-in-json-file-dynamically/3114/2
TAB=$'\t'
sed -i '' -e "s/.*version.*/${TAB}\"version\": \"$tinkunakuyNewVer\",/g" ../package.json

#To recreate the bna file
sudo composer archive create --sourceType dir --sourceName ../ -a $tinkunakuyNewBNA
#To update the card
sudo composer network install --card PeerAdmin@hlfv1 --archiveFile $tinkunakuyNewBNA

sudo composer network upgrade -c PeerAdmin@hlfv1 -n tinkunakuy -V $tinkunakuyNewVer 

#To verfy that we have connection
sudo composer network ping -c admin@tinkunakuy | grep Business
