# Specify a base image
FROM node:10

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y mysql-server mariadb-server \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update && apt-get install -y vim

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --save sequelize@3.35.1
RUN npm install mysql
RUN npm install -g nodemon
RUN npm install 


# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the server
# CMD ["node", "index.js", "tail", "-f", "/dev/null"]

# nodemon is for monitoring
CMD ["nodemon", "--inspect=0.0.0.0:9229", "index.js"]
