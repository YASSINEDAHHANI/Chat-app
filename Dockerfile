# ============================================
# Stage 1: Build the React app
# ============================================
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies (cached layer)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ============================================
# Stage 2: Serve via nginx
# ============================================
FROM nginx:alpine

# Remove default nginx page
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app from stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]