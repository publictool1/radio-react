import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/Chart.css';

const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png';

function Chart() {
    const [tracks, setTracks] = useState([]);
    const [showBest, setShowBest] = useState(true);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await axios.get(`https://pu.xpradio.ru:1030/api/v2/track_stats/${showBest ? 'best' : 'worst'}/?server=1`);
                if (response.status === 200 && response.data.length > 0) {
                    setTracks(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchTracks();
    }, [showBest]);

    const toggleShowBest = () => {
        if (!showBest) {
            setShowBest(true);
        }
    };

    const toggleShowWorst = () => {
        if (showBest) {
            setShowBest(false);
        }
    };

    return (
        <div className='all-container'>
            <div className="all-content">
                <div className="chart-header">
                    <h1 className="section-title">Чарты</h1>
                    <div className="chart-buttons">
                        <button className={showBest ? 'active' : ''} onClick={toggleShowBest} disabled={showBest}>Лучшие</button>
                        <button className={!showBest ? 'active' : ''} onClick={toggleShowWorst} disabled={!showBest}>Худшие</button>
                    </div>
                </div>
                <div className="chart-tracks">
                    {tracks.map((track, index) => (
                        <div className="chart-single" key={index}>
                            <div className="chart-img">
                                <img src={track.image_medium ? 'https://pu.xpradio.ru:1030' + track.image_medium : defaultImage} alt="Обложка" />
                            </div>
                            <div className="chart-info">
                                <h2>{track.title}</h2>
                                <div className="track-block">
                                    <p>Исполнитель: {track.author}</p>
                                    <p>Альбом: {track.album}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Chart;
