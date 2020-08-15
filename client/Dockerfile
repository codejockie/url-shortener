FROM node:latest as build

# Make the 'app' folder the current working directory
WORKDIR /app

# Copy both 'package.json' and 'yarn.lock' (if available)
COPY package.json ./
COPY yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# Build app for production with minification
RUN yarn build

FROM nginx as production
COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]