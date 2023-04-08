# Use an official Node.js runtime as a parent image
FROM node:10

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
# RUN npm cache clean --force
# RUN npm install grpc
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the application for production
RUN npm run build

# Expose port 80 for the container
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]




