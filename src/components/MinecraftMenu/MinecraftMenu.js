import './MinecraftMenu.css'; 
import { Link } from 'react-router-dom';

function MinecraftMenu({ items }) {
   const menuItems = items.length > 0 ? items : [
    { label: 'Главная', path: '/' },
    { label: 'Настройки', path: '/settings' },
    { label: 'О нас', path: '/about' },
  ];
  return (
    <div className="minecraft-menu">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className="minecraft-button"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default MinecraftMenu;