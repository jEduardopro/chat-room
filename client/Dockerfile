
ARG NODE_VERSION=16.15.0
FROM node:${NODE_VERSION}-slim as base

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
## EXPOSE [Port you mentioned in the vite.config file]
EXPOSE 5173
CMD ["npm", "run", "dev"]
