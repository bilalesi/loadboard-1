### STAGE 1: Build ###
FROM node:14.0 as builder
# create a workspace dir for building the app
WORKDIR /usr/src/app
# copy package.json, used to install dependences in the next step
COPY package*.json ./
# install dependencies
RUN npm install
# copy source code inside the container's workdir
COPY . .
# start the build of the app
RUN npm run build

### STAGE 2: Run ###
FROM nginx:alpine
# copy the custom nginx configuration file
ADD ./nginx.conf /etc/nginx/conf.d/default.conf
# copy app build files to nginx webroot folder
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
