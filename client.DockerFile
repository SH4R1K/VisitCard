# ---- Build stage ----
FROM node:18-alpine AS build

WORKDIR /app

# Аргумент для передачи URL API
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Копируем общий package.json
COPY package*.json ./

# Устанавливаем все зависимости
RUN npm ci

# Копируем исходный код клиента
COPY src/ ./client/

# Собираем React-приложение
WORKDIR /app/client
RUN npm run build

# ---- Production stage (Nginx) ----
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=build /app/client/build /usr/share/nginx/html

# Копируем конфиг Nginx для поддержки React Router
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]