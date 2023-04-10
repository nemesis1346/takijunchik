#!/bin/bash

# Wait for the MySQL server to be ready
while ! mysqladmin ping --silent --host="$DATABASE_HOST" --user="$DATABASE_USER" --password="$DATABASE_PASSWORD"; do
    sleep 1
done

# Run Sequelize commands
npx sequelize-cli db:create --env=production
npx sequelize-cli db:migrate --env=production
npx sequelize-cli db:seed:all --env=production

# Start the Node.js app using nodemon
exec nodemon --inspect=0.0.0.0:9229 index.js