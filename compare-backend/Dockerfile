# Application Docker file Configuration
# Visit https://docs.docker.com/engine/reference/builder/

FROM node:20-alpine as development
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
EXPOSE 4000
CMD ["yarn", "debug"]


# Prepare the image when build
# also use to minimize the docker image
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn
COPY . .
RUN yarn build


# Build the image as production
# So we can minimize the size
FROM node:20-alpine as production

WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
ENV PORT=4000
ENV NODE_ENV=Production
RUN yarn install --production
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}

CMD ["yarn", "start"]