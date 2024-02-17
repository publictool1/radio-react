import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainBest.css'

function MainBest(props) {
    const [bestTracks, setBestTracks] = useState([])

    useEffect(() => {
        const fetchBestTracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/best/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setBestTracks(response.data.slice(0, 3)); // Ограничиваем до 4 элементов
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchBestTracks();
    }, []);

    return (
        <div className='bests-container'>
            <div className="best">
                {bestTracks.map((track, index) => (
                    <div className="best-single" key={index}>
                        <div className="bset-img">
                            <img src={'https://pu.xpradio.ru:1030' + track.image_medium} alt="Обложка" />
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
    );
}

export default MainBest;
