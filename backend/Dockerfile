# Use the official Node.js image
FROM node:18

# Set the working directory inside the container to the root of the project
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the container's working directory
COPY package*.json /usr/src/app/

# Install dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . /usr/src/app/

# Expose the application port (optional: if your app uses a port like 3000)
EXPOSE 3000

# Start the application (index.js is directly in the root of the project)
CMD ["node", "index.js"]

