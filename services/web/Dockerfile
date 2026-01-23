FROM node:22-alpine AS build-stage

WORKDIR /app

COPY package*.json package-lock.json ./
RUN npm ci --ignore-scripts || npm install --ignore-scripts

COPY . .
RUN npm run generate

# Production stage
FROM nginx:stable-alpine AS production-stage

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
