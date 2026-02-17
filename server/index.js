const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Разрешаем запросы с любого источника (для разработки)
app.use(cors());

// Эндпоинт для получения описания с Telegram
app.get('/api/description', async (req, res) => {
  // Можно принимать имя канала как параметр запроса, например ?channel=durov
  const channel = req.query.channel || 'durov';
  const url = `https://t.me/${channel}`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);
    const description = $('.tgme_page_description').first().text().trim();

    if (description) {
      res.json({ description });
    } else {
      res.status(404).json({ error: 'Описание не найдено' });
    }
  } catch (error) {
    console.error('Ошибка при запросе к Telegram:', error.message);
    res.status(500).json({ error: 'Не удалось получить данные с Telegram' });
  }
});
// Эндпоинт для получения данных пользователя GitHub
app.get('/api/github-user/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        'User-Agent': 'Minecraft-App/1.0', // GitHub требует User-Agent
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    
    // Извлекаем только нужные поля
    const userData = {
      login: response.data.login,
      name: response.data.name,
      avatar_url: response.data.avatar_url,
      bio: response.data.bio,
      public_repos: response.data.public_repos,
      followers: response.data.followers,
      following: response.data.following,
      html_url: response.data.html_url
    };
    
    res.json(userData);
  } catch (error) {
    console.error('Ошибка GitHub API:', error.message);
    res.status(error.response?.status || 500).json({ 
      error: 'Не удалось получить данные с GitHub' 
    });
  }
});
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});