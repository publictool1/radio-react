import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './Info.css'
import '../concl.css'

function Info(props) {
    const [currentTracks, setCurrentTracks] = useState([]);

    useEffect(() => {
        const fetchCurrentTracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/history/?limit=4&server=1');
                if (response.status === 200 && response.data.results.length > 0) {
                    setCurrentTracks(response.data.results);
                }
            } catch (error) {
                console.error('Ошибка загрузки данных о текущих треках:', error);
            }
        };

        fetchCurrentTracks();

        const interval = setInterval(() => {
            fetchCurrentTracks();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='lasts-container'>
            <h1 className="section-title_four">Последние четыре песни</h1>
            <div className="lasts">
                {currentTracks.map((track, index) => (
                    <div className="last-item" key={index}>
                        <div className="last-image">
                            <img src={track.img_url} alt="Обложка"/> 
                        </div>
                        <div className="last-info">
                            <h3>{track.title}</h3>
                            <p>Автор: {track.author}</p>
                            {/* <p>{track.album}</p> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Info;
