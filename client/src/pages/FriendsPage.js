import FriendGitHub from '../components/friend-github/friend-github';
import MinecraftWindow from '../components/minecraft-window/minecraft-window';
import { useNavigate } from 'react-router-dom';

function FriendsPage() {
    
  const navigate = useNavigate();

  const friends = [
    {
      github: 'Meresk'
    },
    {
      github: '4qiz'
    },
    {
      github: 'Morokenec'
    },
    {
      github: 'Pluhenciya'
    }
  ];

  const handleProjectClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <MinecraftWindow title="Мои друзья" onClose={() => navigate('/')}>
      <div className="projects-list">
        {friends.map((friend, index) => (
            <FriendGitHub GitHubId={friend.github}/>
        ))}
      </div>
    </MinecraftWindow>
  );
}

export default FriendsPage;