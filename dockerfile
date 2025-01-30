# Use a lightweight base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the application source code
COPY . .

# Use a multi-stage build to create a smaller runtime image
FROM node:18-alpine AS main

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app .

# Expose the port the app will use
EXPOSE 5000

# Set the command to run the application
CMD ["npm", "start"]

