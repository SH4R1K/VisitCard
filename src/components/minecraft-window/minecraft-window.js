import React, { useRef } from 'react';
import './minecraft-window.css';

function MinecraftWindow({ title, children, onClose }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="minecraft-window"><div className="window-header">
        <span className="window-title">{title}</span>
        <button className="window-close" onClick={handleClose}>✕</button>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

export default MinecraftWindow;