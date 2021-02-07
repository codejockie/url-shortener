FROM node:lts

# Create app directory
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn install

# Copy app source code
COPY . .

# Build TypeScript
RUN yarn build

# Expose port and start application
EXPOSE 4000
CMD [ "yarn", "start" ]