# Вибираємо Node.js образ
FROM node:20-alpine

# Створюємо робочу директорію всередині контейнера
WORKDIR /usr/src/app

# Копіюємо package.json та yarn.lock
COPY package.json yarn.lock ./

# Встановлюємо залежності через yarn
RUN yarn install --frozen-lockfile

# Копіюємо весь код проєкту
COPY . .

# Відкриваємо порт
EXPOSE 8000

# Команда для запуску додатку
CMD ["yarn", "start"]
