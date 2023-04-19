#!/bin/bash

# Start MySQL service
service mysql start --console

# Add default_authentication_plugin option to my.cnf
echo '[mysqld]' >> /etc/mysql/my.cnf && \
echo 'default_authentication_plugin=mysql_native_password' >> /etc/mysql/my.cnf

# Wait for the MySQL server to be ready
while ! mysqladmin ping --silent --host="$DATABASE_HOST" --user="$DATABASE_USER" --password="$DATABASE_PASSWORD"; do
    sleep 1
    echo "We cannot ping the db"
done

# Grant access to the root user
mysql -u root -p"$DATABASE_PASSWORD" -e "GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost' IDENTIFIED BY '$DATABASE_PASSWORD' WITH GRANT OPTION;"

# Run Sequelize commands
npx sequelize-cli db:create --env=production
npx sequelize-cli db:migrate --env=production
npx sequelize-cli db:seed:all --env=production

# Start the Node.js app using nodemon
exec nodemon --inspect=0.0.0.0:9229 index.js