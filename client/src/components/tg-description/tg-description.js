import React, { useState, useEffect } from 'react';

export default function TgDescription() {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [channel, setChannel] = useState('sh4r1k'); // можно добавить поле ввода

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        setLoading(true);
        // Запрос к своему серверу (при разработке на порту 5000)
        const response = await fetch(`http://localhost:5000/api/description?channel=${channel}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `Ошибка ${response.status}`);
        }
        const data = await response.json();
        setDescription(data.description);
        setError(null);
      } catch (err) {
        setError(err.message);
        setDescription('');
      } finally {
        setLoading(false);
      }
    };

    fetchDescription();
  }, [channel]); // перезапрашивать при смене канала

  return (
        <div>
          <input
            type="text"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
            placeholder="Введите имя канала"
            style={{ padding: 8, marginBottom: 20, width: 200 }}
          />
        <p>
          {loading && 'Загрузка описания...'}
          {error && `Ошибка: ${error}`}
          {!loading && !error && description}
        </p>
        </div>
  );
}