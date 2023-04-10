# Specify a base image
FROM node:10

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y mysql-server mariadb-server vim ffmpeg lame \
    && rm -rf /var/lib/apt/lists/*


# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --save sequelize@3.35.1
RUN npm install mysql
RUN npm install -g nodemon
RUN npm install 

# Copy the rest of the application code
COPY . .

# Configure and start the MySQL server
RUN echo "[mysqld]" >> /etc/mysql/mariadb.conf.d/50-server.cnf && \
    echo "plugin-load-add = auth_socket.so" >> /etc/mysql/mariadb.conf.d/50-server.cnf && \
    echo "default_authentication_plugin=mysql_native_password" >> /etc/mysql/mariadb.conf.d/50-server.cnf && \
    service mysql start && \
    while ! mysqladmin ping --silent; do \
        sleep 1; \
    done && \
    mysql -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY 'root' WITH GRANT OPTION; FLUSH PRIVILEGES;" && \
    service mysql restart

# Initialize Sequelize
RUN service mysql start && \
    while ! mysqladmin ping --silent; do \
        sleep 1; \
    done && \
    npx sequelize-cli db:create --env=production && \
    npx sequelize-cli db:migrate --env=production && \
    npx sequelize-cli db:seed:all --env=production



# Expose port 3000
EXPOSE 3000

# Start the server
# CMD ["node", "index.js", "tail", "-f", "/dev/null"]

# nodemon is for monitoring
CMD ["nodemon", "--inspect=0.0.0.0:9229", "index.js"]
