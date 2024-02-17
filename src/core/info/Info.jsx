import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Info.css'

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
        }, 10000); // Периодический опрос сервера каждые 10 секунд (время в миллисекундах)

        return () => clearInterval(interval); // Очистить интервал при размонтировании компонента
    }, []);

    return (
        <div className='lasts-container'>
            <h2>Последние четыре песни</h2>
            <div className="lasts">
                {currentTracks.map((track, index) => (
                    <div className="last-item" key={index}>
                        <div className="last-image">
                            <img src={track.img_url} alt="Обложка"/> 
                        </div>
                        <div className="last-info">
                            <h3>{track.title}</h3>
                            <p>{track.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Info;
