# Use a lightweight base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies (only production)
RUN npm install --production && \
    npm cache clean --force  # Clean npm cache to reduce size

# Copy the application source code (only necessary files)
COPY . .

# Clean up any unnecessary files from node_modules
RUN rm -rf node_modules/.cache  # Remove unnecessary cache from node_modules

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
CMD ["npm", "run", "server"]

