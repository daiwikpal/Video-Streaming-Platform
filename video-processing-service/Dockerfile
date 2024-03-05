# need to specify what parent image we want on top of l
FROM node:18 AS dependencies

# Copy thae package.json and package-lock.json into our the working directory 
COPY package*.json ./

# Set the working directory for our application 
WORKDIR /app/video-processing-service

# Install ffmpeg in the container - need this for the CLI tool 
RUN apt-get update && apt-get install -y ffmpeg

# Install all other dependencies 
RUN npm install

# Copy all of our source code 
COPY . . 

# Make port 3000 available outside this container  - need to change code to use 3000
EXPOSE 3000 

FROM dependencies as builder
RUN npm run build
EXPOSE 3000
CMD npm run start