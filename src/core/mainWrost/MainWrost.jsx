import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MainWrost.css';

function MainWrost(props) {
    const [wrostTracks, setWrostTracks] = useState([]);

    useEffect(() => {
        const tracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/worst/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setWrostTracks(response.data.slice(0, 3));
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        tracks();
    }, []);

    return (
        <div className='wrost-container'>
            <div className="wrost">
                {wrostTracks.map((track, index) => (
                    <div className="wrost-single" key={index}>
                        <div className="wrost-img">
                        <img src={'https://pu.xpradio.ru:1030' + track.image_medium} alt="Обложка" />
                        </div>
                        <div className="wrost-info">
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

export default MainWrost;
