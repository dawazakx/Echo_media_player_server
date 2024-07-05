# Stage 1: Build the TypeScript project
FROM node:18 AS builder

# Create and change to the app directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Compile the TypeScript code
RUN npm run build

# Stage 2: Run the compiled application
FROM node:18-alpine

# Create and change to the app directory
WORKDIR /app

# Copy the compiled code from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json

# Install only production dependencies
RUN npm install --production

# Expose the port on which the app runs
EXPOSE 9090

# Command to run the app
CMD ["node", "dist/index.js"]