# client/Dockerfile
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Expose React port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
