# Install Node
FROM node:7.6
MAINTAINER Bryan Grill

# Make a working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY /dist/package.json /usr/src/app
RUN npm install --production

# Copy in the app
COPY /dist /usr/src/app

# Set ENV
ENV NODE_ENV production

# Expose Port
EXPOSE 3000

# Healthcheck
HEALTHCHECK CMD curl --fail http://localhost:3000/ || exit 1

# Start server
CMD [ "npm", "start" ]
