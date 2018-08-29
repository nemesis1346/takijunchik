#Errors Documentation

#Error in building react 
Node.JS Error: ENOSPC
#Solution:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
sysctl --system
