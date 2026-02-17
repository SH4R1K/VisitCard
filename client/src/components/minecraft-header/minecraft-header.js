import React, { useRef, useState } from 'react';
import TgDescription from '../tg-description/tg-description';
export default function MinecraftHeader() {
    const [bgIndex, setBgIndex] = useState(0);
  // Массив фоновых изображений (пути могут быть относительные из public или импортированные)
  const backgrounds = [
    'url("/assets/blocks/dirt.png")',
    'url("/assets/blocks/stone.png")',
    'url("/assets/blocks/stoneMoss.png")',
    'url("/assets/blocks/oreCoal.png")',
    'url("/assets/blocks/blockDiamond.png")',
    'url("/assets/blocks/bedrock.png")',
  ];

  const audioRef = useRef(null);

  const handleHeaderClick = () => {
    // Переключаем фон (циклически)
    setBgIndex((prev) => (prev + 1) % backgrounds.length);
  };

  return (
    <header
      className="App-header"
      onClick={handleHeaderClick}
      style={{ backgroundImage: backgrounds[bgIndex] }}
    >
         <TgDescription/> 
         </header>
  );
}