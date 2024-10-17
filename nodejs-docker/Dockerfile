# Specify a base image
FROM node:20

# Install MariaDB client tools
RUN apt-get update && \
    apt-get install -y mariadb-client

# Install MySQL server
RUN apt-get update && \
    apt-get install -y mariadb-server

# Create MySQL socket directory
RUN mkdir -p /var/run/mysqld && chown mysql:mysql /var/run/mysqld

# Set the working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update \
    && apt-get install -y vim ffmpeg lame \
    && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g nodemon@latest
RUN npm install 

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Copy the entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /app/docker-entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/app/docker-entrypoint.sh"]


# Expose debug port
EXPOSE 9229

# nodemon is for monitoring
CMD ["nodemon", "--inspect=0.0.0.0:9229", "index.js"]
