# Build stage
FROM node:22-alpine AS build-stage
WORKDIR /app

ARG VITE_API_GATEWAY_URL
ARG VITE_MSW

ENV VITE_API_GATEWAY_URL=${VITE_API_GATEWAY_URL}
ENV VITE_MSW=${VITE_MSW}

RUN corepack enable
RUN corepack prepare yarn@4 --activate

COPY package*.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install --immutable
COPY . .
RUN yarn build

# Production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
