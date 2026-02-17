FROM node:20-alpine

WORKDIR /app

# Копируем общий package.json и lock-файл
COPY package*.json ./

# Устанавливаем все зависимости (они общие)
RUN npm install

# Копируем исходный код сервера
COPY server/ ./server/

# Открываем порт (будет переопределён через переменную окружения)
EXPOSE 5000

# Запускаем сервер (путь относительно /app)
CMD ["node", "server/index.js"]