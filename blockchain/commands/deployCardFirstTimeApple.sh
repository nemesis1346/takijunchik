#!/bin/bash

#With this following command we create the bna file
composer archive create -t dir -n ../

# The source command can be used to load any functions file into the current shell script or a command prompt.
# Gets tinkunakuy version and latest bna file
source ./getLatestBnaAndVer.sh

echo "Using tinkunakuy version: $tinkunakuyVer "
echo "Using tinkunakuy bna file: $tinkunakuyBNA "

#With the following install the HC runtime with the specific name of the application
composer network install --card PeerAdmin@hlfv1 --archiveFile $tinkunakuyBNA

# Check what the command is outputting
echo "composer network install --card PeerAdmin@hlfv1 --archiveFile $tinkunakuyBNA"

#We deploy the business network with an administrator, the association with the bna card and the output name of the file of that card
composer network start --networkName tinkunakuy --networkVersion $tinkunakuyVer --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file tinkunakuy.card

# Check what the command is outputting, are the variables outputted correctly
echo "composer network start --networkName tinkunakuy --networkVersion $tinkunakuyVer admin --networkAdmin admin --  networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file tinkunakuy.card"

#To import the card
composer card import --file tinkunakuy.card
#We test that we can communicate with the fabric
composer network ping --card admin@tinkunakuy
