

# FROM node:18-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./

# RUN npm install

# # Bundle app source
# COPY . .

# RUN npm run build

# EXPOSE 3000

# CMD [ "npm", "run" , "start:prod" ]




# ###################
# # BUILD FOR LOCAL DEVELOPMENT
# ###################

# FROM node:18-alpine As development

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# RUN npm ci

# COPY --chown=node:node . .

# USER node

# ###################
# # BUILD FOR PRODUCTION
# ###################

# FROM node:18-alpine As build

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node . .

# RUN npm run build

# ENV NODE_ENV production

# RUN npm ci --only=production && npm cache clean --force

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM node:18-alpine As production

# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# EXPOSE 3000


# Build
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json  ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --production

# Production
FROM node:20-alpine AS production
WORKDIR /usr/src/app

COPY  --from=build usr/src/app/dist ./dist
COPY  --from=build usr/src/app/node_modules ./node_modules

EXPOSE 3000/tcp

CMD [ "node", "dist/src/main.js" ]
