import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../core/concl.css';

const MainBestWorst = () => {
    const [bestTracks, setBestTracks] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const [numberOfColumns, setNumberOfColumns] = useState(2);
    const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png'; // Количество колонок

    useEffect(() => {
        const fetchBestTracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/best/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setBestTracks(response.data.slice(0, 12));
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchBestTracks();
    }, []);

    useEffect(() => {
        setIsAtStart(currentIndex === 0);
        setIsAtEnd(currentIndex + numberOfColumns >= bestTracks.length);
    }, [currentIndex, numberOfColumns, bestTracks]);

    const scrollLeft = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - numberOfColumns, 0));
    };

    const scrollRight = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + numberOfColumns, bestTracks.length - 1));
    };

    return (
        <div className='main-best-worst'>
            <button className="scroll-button scroll-button-left" onClick={scrollLeft} disabled={isAtStart}>←</button>
            <div className="best-tracks">
                <h1 className="section-title">Лучшие песни</h1>
                <p className='sub-title'>песни с наивысшим рейтингом</p>
                <div className="track-list" style={{ gridTemplateColumns: `repeat(${numberOfColumns}, 1fr)` }}>
                    {bestTracks.slice(currentIndex, currentIndex + numberOfColumns).map((track, index) => (
                        <div className="track" key={index}>
                            <div className="track-image">
                            <img src={track.image_medium ? `https://pu.xpradio.ru:1030${track.image_medium}` : defaultImage} alt="Обложка" />
                            </div>
                            <div className="track-info">
                                <h2>{track.title}</h2>
                                <p>Исполнитель: {track.author}</p>
                                <p>Альбом: {track.album}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="scroll-button scroll-button-right" onClick={scrollRight} disabled={isAtEnd}>→</button>
        </div>
    );
};

export default MainBestWorst;
