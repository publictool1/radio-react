import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/MainBestWorst.css';

function MainBestWorst(props) {
    const [bestTracks, setBestTracks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [transformValue, setTransformValue] = useState(33.33); // Значение по умолчанию для десктопной версии
    const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png';

    useEffect(() => {
        const fetchBestTracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/best/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setBestTracks(response.data.slice(0, 10));
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchBestTracks();
    }, []);

    useEffect(() => {
        setIsAtStart(currentIndex === 0);
        setIsAtEnd(currentIndex === bestTracks.length - 1);
    }, [currentIndex, bestTracks]);

    useEffect(() => {
        const handleResize = () => {
            // Проверяем размер экрана и устанавливаем значение transform в зависимости от этого
            if (window.innerWidth <= 600) {
                setTransformValue(105); // Значение для мобильной версии
            } else {
                setTransformValue(33.33); // Значение для десктопной версии
            }
        };

        // Вызываем функцию обработки изменения размера окна при монтировании и обновлении компонента
        window.addEventListener('resize', handleResize);
        handleResize(); // Вызываем её ещё раз при монтировании, чтобы установить правильное значение

        // Очищаем слушателя события при размонтировании компонента
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const scrollLeft = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const scrollRight = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, bestTracks.length - 1));
    };

    return (
        <div className='twise'>
            <button className="scroll-button" onClick={scrollLeft} disabled={isAtStart}>←</button>
            <div className="best">
                <h1 className="section-title">Лучшие песни</h1>
                <p className='ps'>песни с наивысшим рейтингом</p>
                <div className="page" style={{ transform: `translateX(-${currentIndex * transformValue}%)` }}>
                    {bestTracks.map((track, index) => (
                        <div className="best-single_main" key={index}>
                            <div className="best-img">
                            <img src={track.image_medium ? `https://pu.xpradio.ru:1030${track.image_medium}` : defaultImage} alt="Обложка" />
                            </div>
                            <div className="best-info">
                                <h2>{track.title}</h2>
                                <p>{track.author}</p>
                                <p>{track.album}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="scroll-button" onClick={scrollRight} disabled={isAtEnd}>→</button>
        </div>
    );
}

export default MainBestWorst;
