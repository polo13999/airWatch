# Grab the node image
FROM node:8.9.1

RUN npm install -g pm2
RUN npm install -g yarn

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN yarn

# Bundle app source
COPY . /usr/src/app
RUN npm run build

# Open app port and start
EXPOSE 3000
CMD [ "npm", "run", "start" ]