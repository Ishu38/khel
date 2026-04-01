FROM node:20-alpine
WORKDIR /app

# Copy shared workspace first
COPY shared/ /app/shared/

# Copy gateway package + root workspace config
COPY package.json /app/package.json
COPY gateway/package.json /app/gateway/package.json

# Install dependencies
RUN npm install --workspace=gateway

# Copy gateway source
COPY gateway/ /app/gateway/

EXPOSE 3001
CMD ["node", "gateway/src/server.js"]
