# Use the official Node.js 18 image as base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Expose the port on which the backend will run
EXPOSE 3001

# Copy the entrypoint script and set permissions
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

# Set the entry point
ENTRYPOINT ["/bin/sh", "./entrypoint.sh"]
