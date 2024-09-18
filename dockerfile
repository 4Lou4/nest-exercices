# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the application port (adjust this if your app uses a different port)
EXPOSE 3000

# Start the NestJS application in development mode
CMD ["npm", "run", "start:prod"]
