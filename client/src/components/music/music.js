import React, { useRef, useState, useEffect } from 'react';

function MinecraftMusic({ audioSrc }) {
    // Ссылка на наш аудио-элемент
    const audioRef = useRef(null);
    // Состояние для отслеживания, играет ли музыка
    const [isPlaying, setIsPlaying] = useState(false);
    // Состояние для обработки возможных ошибок загрузки
    const [isLoading, setIsLoading] = useState(true);

    // Функция для запуска/паузы
    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                // Важно: современные браузеры требуют, чтобы воспроизведение начиналось
                // после действия пользователя (клика). Это условие выполняется.
                audioRef.current.play().catch(error => {
                    console.error("Ошибка воспроизведения:", error);
                    setIsPlaying(false);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Эффект для обработки окончания трека и его зацикливания
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            // Перематываем в начало и запускаем снова
            audio.currentTime = 0;
            audio.play().catch(error => console.error("Ошибка перезапуска:", error));
        };

        const handleCanPlay = () => {
            setIsLoading(false);
        };

        audio.addEventListener('ended', handleEnded);
        audio.addEventListener('canplay', handleCanPlay);

        // Очистка событий при размонтировании компонента
        return () => {
            audio.removeEventListener('ended', handleEnded);
            audio.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    return (
        <div className="music-player" style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 20, // Чтобы плеер был поверх звездного фона (zIndex:10)
            backgroundColor: 'rgba(45, 45, 45, 0.8)', // Полупрозрачный цвет блока
            padding: '10px 15px',
            border: '4px solid #2D2D2D',
            boxShadow: 'inset -2px -2px 0 #5a5a5a, inset 2px 2px 0 #FFFFFF, 3px 3px 0 #000000',
            fontFamily: 'Minecraft, monospace',
            color: 'white',
            textShadow: '2px 2px 0 #000000',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            imageRendering: 'pixelated',
            maxWidth: '250px'
        }}>
            {/* Сам аудио-элемент мы скрываем */}
            <audio ref={audioRef} src={audioSrc} preload="metadata" />
            
            {/* Кнопка Play/Pause */}
            <button 
                onClick={togglePlay} 
                disabled={isLoading}
                style={{
                    fontFamily: 'Minecraft, monospace',
                    backgroundColor: '#808080',
                    border: '4px solid #2D2D2D',
                    borderTopColor: '#FFFFFF',
                    borderLeftColor: '#FFFFFF',
                    borderBottomColor: '#5a5a5a',
                    borderRightColor: '#5a5a5a',
                    color: 'white',
                    padding: '5px 15px',
                    cursor: 'pointer',
                    textShadow: '2px 2px 0 #000000',
                    boxShadow: '2px 2px 0 #000000',
                    fontSize: '16px',
                    minWidth: '80px',
                    opacity: isLoading ? 0.5 : 1,
                }}
            >
                {isLoading ? '...' : (isPlaying ? '⏸️ OFF' : '▶️ ON')}
            </button>
            
            {/* Индикатор загрузки */}
            {isLoading && <span style={{ fontSize: '12px' }}>Загрузка...</span>}
        </div>
    );
}

export default MinecraftMusic;