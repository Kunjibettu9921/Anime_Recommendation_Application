# Use the Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the application
RUN npm run build

# Expose the port for the Vite dev server
EXPOSE 5173

# Command to start the development server
CMD ["npm", "run", "dev", "--", "--host"]