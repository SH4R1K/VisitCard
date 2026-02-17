FROM node:20-alpine

WORKDIR /app

# Копируем только серверный package.json
COPY server/package*.json ./

RUN npm ci --no-audit --no-fund

COPY server/ ./

EXPOSE 5000
CMD ["node", "index.js"]