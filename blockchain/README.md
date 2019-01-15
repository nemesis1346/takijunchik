# tinkunakuy

education platform


#Control of stable versions

Fabric Version hlfv12
NodeJs Version 8.11.4
Composer-Runtime 0.20.0
Composer-Cli 0.20.0
Npm Version 6.4.0

#Useful commands
#For commiting new changes
git add -A && git commit -m "Your Message"
#For finding an specific package
grep -r -l "Composer runtime"

#If I have the conflict composer runtime 0.20.1 with conflict composer-cli 0.20.0, be sure to delete the node_modules folder, install the last version of composer-cli, but be sure that its the same version with the package.json specified!!!!