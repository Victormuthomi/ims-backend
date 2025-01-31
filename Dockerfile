# Stage 1: Build dependencies
FROM node:18-alpine AS build

WORKDIR /app

# Install production dependencies only
COPY package.json package-lock.json ./
RUN npm ci --production

# Copy source code (excluding unnecessary files using .dockerignore)
COPY . .

# Clean npm cache to reduce image size
RUN npm cache clean --force

# Stage 2: Final image
FROM node:18-alpine

WORKDIR /app

# Install only production dependencies in the final image
COPY --from=build /app /app

# Remove unnecessary files and folders to reduce image size
RUN rm -rf /app/tests /app/.git /app/.npm /app/node_modules/.cache

EXPOSE 8090

CMD ["npm", "start"]

