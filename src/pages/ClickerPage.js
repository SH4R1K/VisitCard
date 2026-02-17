import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MinecraftWindow from '../components/minecraft-window/minecraft-window';
import './ClickerPage.css';

// Простая функция хеширования (не криптостойкая, но для защиты от случайного изменения)
function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(36);
}

// Секретная соль для подписи (можно сменить, если хотите)
const SECRET_SALT = process.env.SALT;

function ClickerPage() {
  const navigate = useNavigate();

  const [points, setPoints] = useState(0);
  const [blocks, setBlocks] = useState([]);
  const [blockTypes, setBlockTypes] = useState([]);

  useEffect(() => {
    loadProgress();
    generateBlockTypes();
  }, []);

  const generateBlockTypes = () => {
    const types = [
      { name: 'Земля', image: "url(/assets/blocks/dirt.png)", clicksNeeded: 3, reward: 1 },
      { name: 'Камень', image: "url(/assets/blocks/stone.png)", clicksNeeded: 5, reward: 2 },
      { name: 'Уголь', image: "url(/assets/blocks/oreCoal.png)", clicksNeeded: 7, reward: 3 },
      { name: 'Железо', image: "url(/assets/blocks/oreIron.png)", clicksNeeded: 10, reward: 5 },
      { name: 'Бедрок', image: "url(/assets/blocks/bedrock.png)", clicksNeeded: 100, reward: 50 },
      { name: 'Алмаз', image: "url(/assets/blocks/oreDiamond.png)", clicksNeeded: 20, reward: 12 },
      { name: 'Изумрудный блок', image: "url(/assets/blocks/blockEmerald.png)", clicksNeeded: 10, reward: 50 },
    ];
    setBlockTypes(types);
    // Создаём начальный набор блоков
    spawnNewBlocks(types, 5);
  };

  const spawnNewBlocks = (types, count) => {
    const newBlocks = [];
    for (let i = 0; i < count; i++) {
      const randomType = types[Math.floor(Math.random() * types.length)];
      newBlocks.push({
        id: Date.now() + i + Math.random(), // уникальный ключ
        type: randomType,
        clicksLeft: randomType.clicksNeeded,
      });
    }
    setBlocks(prev => [...prev, ...newBlocks]);
  };

  const handleBlockClick = (blockId) => {
    setBlocks(prev => {
      const updated = prev.map(block => {
        if (block.id === blockId) {
          const newClicksLeft = block.clicksLeft - 1;
          if (newClicksLeft <= 0) {
            setPoints(p => {
              const newPoints = p + block.type.reward;
              saveProgress(newPoints); 
              return newPoints;
            });
            return null;
          } else {
            return { ...block, clicksLeft: newClicksLeft };
          }
        }
        return block;
      }).filter(b => b !== null); 

      
      if (updated.length < 3) {
        spawnNewBlocks(blockTypes, 2);
      }
      return updated;
    });
  };

  
  const saveProgress = (pointsToSave) => {
    const data = {
      points: pointsToSave,
      timestamp: Date.now(),
    };
    const dataString = JSON.stringify(data);
    const signature = simpleHash(dataString + SECRET_SALT);
    localStorage.setItem('clicker_progress', dataString);
    localStorage.setItem('clicker_signature', signature);
  };

  // Загрузка и проверка подписи
  const loadProgress = () => {
    const savedData = localStorage.getItem('clicker_progress');
    const savedSignature = localStorage.getItem('clicker_signature');
    if (savedData && savedSignature) {
      const calculatedSignature = simpleHash(savedData + SECRET_SALT);
      if (calculatedSignature === savedSignature) {
        try {
          const parsed = JSON.parse(savedData);
          setPoints(parsed.points);
        } catch (e) {
          console.error('Ошибка парсинга сохранённых данных');
        }
      } else {
        console.warn('Подпись не совпадает – возможно подделка данных. Сбрасываем.');
        localStorage.removeItem('clicker_progress');
        localStorage.removeItem('clicker_signature');
      }
    }
  };

  const resetProgress = () => {
    if (!window.confirm("Вы уверены, что хотите сбросить прогресс?"))
        return;
    localStorage.removeItem('clicker_progress');
    localStorage.removeItem('clicker_signature');
    setPoints(0);
    setBlocks([]);
    spawnNewBlocks(blockTypes, 10);
  };

  return (
    <MinecraftWindow title="Кликер" onClose={() => navigate('/')}>
      <div className="clicker-container">
        <div className="points-display">
          <span>⛏️ Поинты: </span>
          <span className="points-value">{points}</span>
        </div>

        <div className="blocks-field">
          {blocks.map(block => (
            <div
              key={block.id}
              className="minecraft-block"
              style={{ backgroundImage: block.type.image }}
              onClick={() => handleBlockClick(block.id)}
            >
              <div className="block-clicks no-select">{block.clicksLeft}</div>
            </div>
          ))}
        </div>

        <button className="reset-button" onClick={resetProgress}>
          Сбросить прогресс
        </button>
      </div>
    </MinecraftWindow>
  );
}

export default ClickerPage;