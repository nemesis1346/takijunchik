#!/bin/bash

sudo ../../fabric-dev-servers/startFabric.sh
sudo ../../fabric-dev-servers/createPeerAdminCard.sh

#With this following command we create the bna file
sudo composer archive create -t dir -n ../


# The source command can be used to load any functions file into the current shell script or a command prompt.
# Gets tinkunakuy version and latest bna file
sudo chmod +x getLatestBnaAndVer.sh
source ./getLatestBnaAndVer.sh

echo "Using tinkunakuy version: $tinkunakuyVer "
echo "Using tinkunakuy bna file: $tinkunakuyBNA "

#With the following install the HC runtime with the specific name of the application
sudo composer network install --card PeerAdmin@hlfv1 --archiveFile $tinkunakuyBNA
#We deploy the business network with an administrator, the association with the bna card and the output name of the file of that card
sudo composer network start --networkName tinkunakuy --networkVersion $tinkunakuyVer --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file tinkunakuy.card
#To import the card
sudo composer card import --file tinkunakuy.card
#We test that we can communicate with the fabric
sudo composer network ping --card admin@tinkunakuy

sudo node ../middleware/server.js
