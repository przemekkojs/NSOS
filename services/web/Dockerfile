# Build stage
FROM node:22-alpine AS build-stage
WORKDIR /app

ARG NUXT_PUBLIC_API_URL
ARG NUXT_PUBLIC_MSW_ENABLED

ENV NUXT_PUBLIC_API_URL=${NUXT_PUBLIC_API_URL}
ENV NUXT_PUBLIC_MSW_ENABLED=${NUXT_PUBLIC_MSW_ENABLED}

COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine AS production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
