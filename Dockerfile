# Step 1: Use Node.js as the base image
FROM node:18-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json into the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application files
COPY . .

# Step 6: Build the TypeScript project
RUN npm run build

# Step 7: Expose the application port (adjust if necessary)
EXPOSE 4000

# Step 8: Start the application
CMD ["npm", "start"]
