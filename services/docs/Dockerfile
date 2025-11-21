# Build stage
FROM node:22-alpine AS build-stage
WORKDIR /app

# Install git (required by VitePress for lastUpdated feature)
RUN apk add --no-cache git

RUN corepack enable
RUN corepack prepare yarn@4 --activate

COPY package*.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable
COPY . .
RUN yarn docs:build

# Production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/.vitepress/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
