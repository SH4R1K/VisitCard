FROM nginx:alpine

# Копируем заранее собранные статические файлы в папку Nginx
COPY ./build /usr/share/nginx/html

# (Опционально) копируем кастомный конфиг Nginx для поддержки React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]