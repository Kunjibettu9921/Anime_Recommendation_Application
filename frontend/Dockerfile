# Step 1: Use the official Node.js runtime as a parent image
FROM node:18

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . /app/

# Step 6: Expose the port that the app will run on
EXPOSE 3000

# Step 7: Set the default command to run the React app
CMD ["npm", "start"]