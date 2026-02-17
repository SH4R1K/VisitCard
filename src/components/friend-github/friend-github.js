import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './friend-github.css'; 
function FriendGitHub({ GitHubId }) {
    const [githubData, setGithubData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/github-user/${GitHubId}`);
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
    const handleFriendClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
    return (
        githubData && (
        <div
            className="friend-item"
            onClick={() => handleFriendClick(githubData.html_url)}
            >
            <div className="avatar-container">
                <img
                    src={githubData.avatar_url}
                    alt="avatar"
                    className="avatar"
                />
            </div>
            <h1 className="about-name">{githubData.name || githubData.login}</h1>
        </div>
        )
    );
}

export default FriendGitHub;