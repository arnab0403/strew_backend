FROM node:24-alpine

WORKDIR /app

# Copy package manifests
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code and static assets
COPY src ./src
COPY Premium ./Premium
COPY Thumbnails ./Thumbnails

EXPOSE 8080

ENV PORT=8080

CMD ["node", "src/server.js"]
