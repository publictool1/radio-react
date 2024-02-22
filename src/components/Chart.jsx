import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Chart.css';

// Путь к изображению аватарки по умолчанию
const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png';

function Chart() {
    const [bestTracks, setBestTracks] = useState([]);
    const [wrostTracks, setWrostTracks] = useState([]);

    useEffect(() => {
        const fetchBestTracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/best/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setBestTracks(response.data.slice(0, 8));
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchBestTracks();
    }, []);

    useEffect(() => {
        const fetchWorstTracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/worst/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setWrostTracks(response.data.slice(0, 8));
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchWorstTracks();
    }, []);

    return (
        <div className='all-container'>
            <div className="all-content">
                <div className="bestz">
                    <h1 className="section-title">Лучшие песни</h1>
                    {bestTracks.map((track, index) => (
                        <div className="best-single" key={index}>
                            <div className="best-img">
                                <img src={track.image_medium ? 'https://pu.xpradio.ru:1030' + track.image_medium : defaultImage} alt="Обложка" />
                            </div>
                            <div className="best-info">
                                <h2>{track.title}</h2>
                                <p>Исполнитель: {track.author}</p>
                                <p>Альбом: {track.album}</p>
                            </div>
                        </div>
                    ))}
                    <Link to="/all-best">Посмотреть все песни с наивысшим рейтингом</Link>
                </div>
                <div className="worst">
                    <h1 className="section-title">Худшие песни</h1>
                    {wrostTracks.map((track, index) => (
                        <div className="worst-single" key={index}>
                            <div className="worst-img">
                                <img src={track.image_medium ? 'https://pu.xpradio.ru:1030' + track.image_medium : defaultImage} alt="Обложка" />
                            </div>
                            <div className="worst-info">
                                <h2>{track.title}</h2>
                                <p>Исполнитель: {track.author}</p>
                                <p>Альбом: {track.album}</p>
                            </div>
                        </div>
                    ))}
                    <Link to="/all-wrost">Посмотреть все песни с худшим рейтингом</Link>
                </div>
            </div>
        </div>
    );
}

export default Chart;
