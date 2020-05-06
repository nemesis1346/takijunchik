#!/bin/bash -e
mkdir -p /etc/mysql/mariadb.conf.d
# ln -s /home/apps/conf_and_scripts/prod/conf/my.tiny.cnf /etc/mysql/mariadb.conf.d/90-nobleprog.cnf #this i dont think is necessary
apt install mariadb-server

#setting the root password:
echo "UPDATE user SET password = PASSWORD('asdf'), plugin='' where user='root'; FLUSH PRIVILEGES;" | mysql -B mysql
sed -i '/^password/s/=.*$/= asdf/' /etc/mysql/debian.cnf