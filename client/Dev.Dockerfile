FROM node:lts-alpine

# Make the 'app' folder the current working directory
WORKDIR /app

# Copy both 'package.json' and 'yarn.lock' (if available)
COPY package.json ./
COPY yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

EXPOSE 8080
CMD [ "yarn", "serve" ]