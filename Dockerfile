# FROM node:lts-alpine
# ENV NODE_ENV=production
# WORKDIR /usr/src
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules ../
# COPY . .
# EXPOSE 4000
# RUN chown -R node /usr/src
# USER node
# CMD ["npm", "start"]


# Use the official Node.js image as the base image
FROM node:23-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your application runs on
EXPOSE 4000

# Set environment variables (optional, can also be passed during runtime)
ENV NODE_ENV=production

# build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]