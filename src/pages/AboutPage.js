import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MinecraftWindow from '../components/minecraft-window/minecraft-window';
import './AboutPage.css'; 

function AboutPage() {
    const navigate = useNavigate();
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GITHUB_USERNAME = 'sh4r1k';

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/github-user/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Ошибка загрузки');
        const data = await response.json();
        setGithubData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Данные для соцсетей (можно оставить статичными)
  const socials = [
    { name: 'GitHub', url: `https://github.com/${GITHUB_USERNAME}`, icon: '🐙' },
    { name: 'Telegram', url: 'https://t.me/sh4r1k', icon: '📱' },
     ];

  return (
    <MinecraftWindow title="О разработчике" onClose={() => navigate('/')}>
      <div className="about-me-content">
        {loading && <p>Загрузка данных с GitHub...</p>}
        {error && <p className="error">Ошибка: {error}</p>}
        
        {githubData && (
          <>
            <div className="avatar-container">
              <img 
                src={githubData.avatar_url} 
                alt="avatar" 
                className="avatar"
              />
            </div>
            
            <h1 className="about-name">{githubData.name || githubData.login}</h1>
            
            {githubData.bio && (
              <p className="about-description">{githubData.bio}</p>
            )}
            
            <section className="about-section">
                <h3>Обо мне</h3>
                <p>Мяу мяу мяу</p>
            </section>
            
            <section className="about-section">
              <h3>📬 Контакты</h3>
              <div className="social-buttons">
                {socials.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-button"
                  >
                    <span className="social-icon">{social.icon}</span>
                    <span className="social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </MinecraftWindow>
  );
}
export default AboutPage;