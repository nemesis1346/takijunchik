#!/bin/bash
#needs sudo -i
#completely remove mysql

#first do this
apt-get remove --purge mysql-server mysql-client mysql-common -y
rm -rf /var/lib/mysql/ #to make sure it completely deleted
rm -rf /etc/mysql
find / -iname 'mysql*' -exec rm -rf {} \;
service mysqld start

#then do this
apt -y remove --purge mysql*
apt -y purge mysql*
apt -y autoremove
apt -y autoclean
apt -y remove dbconfig-mysql
apt -y dist-upgrade

#then maria db needs to be installed

