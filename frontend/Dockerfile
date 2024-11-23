# Use official Node.js image as base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application into the container
COPY . .

# Expose the port that the React app will run on
EXPOSE 3000

# Build the React app
RUN npm run build

# Start the app
CMD ["npm", "start"]
