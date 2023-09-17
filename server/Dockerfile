ARG NODE_VERSION=16.15.0
FROM node:${NODE_VERSION}-slim as base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_ENV="production"
RUN npm run build
RUN npm prune --omit=dev

EXPOSE 3000
CMD [ "npm", "run", "start" ]
