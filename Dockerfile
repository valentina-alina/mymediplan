# Use the official Node.js image.
FROM node:20.15.1-slim AS build

# Create and change to the app directory.
WORKDIR /usr/app

# This command uses package.json to install dependencies.
COPY package.json ./ 

# Install app dependencies using the `npm install` command.
RUN npm install

# Copy the app files to the container.
COPY . .

# Build the application
RUN npm run build

# Serve with NGINX
FROM nginx:stable
COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]