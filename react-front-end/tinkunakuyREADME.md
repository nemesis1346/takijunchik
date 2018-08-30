#Errors Documentation

#Error in building react 
Node.JS Error: ENOSPC
#Solution:
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
sysctl --system

#Error in this.props not recognized .then()
Its because the brackets in one of thre promises, take the brackets out when distpaching
