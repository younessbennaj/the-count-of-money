FROM node:10

# Create app directory => container has is own file system virtualized from the OS host
WORKDIR /usr/src/app/client

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

# Bundle app source code inside the Docker image
COPY . .

# since our app is running on port 3000 we need to use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

CMD [ "npm", "start" ]