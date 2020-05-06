set -x
set -e

BASEDIR=$(cd $(dirname $0); pwd)

cd "`dirname $0`"

if [ `id -u` != 0 ] ; then
    sudo "$0" "$@"
    exit $?
fi

#this folder is for the backup
[ -d "/backup" ] && echo "Directory /backup exists." || sudo mkdir /backup

#permissions
sudo chmod -R 777 ${BASEDIR}
#installing dependencies of the front end
cd  ${BASEDIR}/react-front-end/
sudo npm install 
sudo npm run-script build
echo "FINISHED INSTALLING FRONT END>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"

cd ${BASEDIR}/nodejs-firebase
sudo npm install
echo "FINISHED INSTALLING BACK END>>>>>>>>>>>>>>>>>>>"

#Second we install the dependencies of the server and run the database
cd ${BASEDIR}/scripts
sudo sh setup_database.sh

#now we copy paste the services
sudo cp ${BASEDIR}/yachachik-server.service /etc/systemd/system/

#now we run the services
sudo systemctl daemon-reload

sudo systemctl stop yachachik-server
sudo systemctl enable yachachik-server
sudo systemctl start yachachik-server
