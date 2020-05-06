#!/bin/bash
# Removes old revisions of snaps
# CLOSE ALL SNAPS BEFORE RUNNING THIS
set -eu

LANG=en_US.UTF-8 snap list --all | awk '/disabled/{print $1, $3}' |
    while read snapname revision; do
        snap remove "$snapname" --revision="$revision"
    done

sudo apt-get autoremove
# sudo du -sh /var/cache/apt 
# sudo rm -rf /var/cache/apt 

#this will delete all ruby on rails gems in local machine
sudo rm -rf /var/lib/gems/2.5.0/*
sudo rm -rf /var/gems/2.5.0
sudo dpkg -l | grep "rc  " | sed s/rc/"sudo apt-get purge -y"/  | awk -F"   " '{print $1}'  | bash
sudo journalctl --vacuum-size=500M

# possible conflicting space folders
sudo rm -rf /home/apps/seoslidepresenter/.vscode-server/
sudo rm -rf /home/apps/seoslidepresenter/.npm/
sudo rm -rf /home/apps/seoslidepresenter/tmp/
sudo rm -rf /home/apps/seoslidepresenter/node_modules/
