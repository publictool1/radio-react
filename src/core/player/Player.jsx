import React, { useState, useEffect } from 'react';
import './Player.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function Player() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchCurrentTrack();
        }, 5000); // Периодический опрос сервера каждые 5 секунд (время в миллисекундах)

        return () => clearInterval(interval); // Очистить интервал при размонтировании компонента
    }, []);

    const fetchCurrentTrack = async () => {
        try {
            const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/history/?limit=1&server=1');
            if (response.status === 200 && response.data.results.length > 0) {
                setCurrentTrack(response.data.results[0]);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных о текущем треке:', error);
        }
    };

    const handlePlay = async () => {
        fetchCurrentTrack(); // Вызов функции для получения текущего трека
    };

    const handleLike = async () => {
        if (!liked) {
            setLiked(true);
            setDisliked(false);
            try {
                await axios.post(`https://pu.xpradio.ru:1030/api/v2/music/${currentTrack.id}/like/`);
            } catch (error) {
                console.error('Ошибка при отправке запроса на лайк:', error);
            }
        }
    };

    const handleDislike = async () => {
        if (!disliked) {
            setDisliked(true);
            setLiked(false);
            try {
                await axios.post(`https://pu.xpradio.ru:1030/api/v2/music/${currentTrack.id}/dislike/`);
            } catch (error) {
                console.error('Ошибка при отправке запроса на дизлайк:', error);
            }
        }
    };

    return (
        <div className="player-container">
            <div className="player-text">
                <h1>Играет сейчас</h1>
                <h2>Не забудьте оценить песню!</h2>
            </div>
            <div className='player'>
                <div className="player-content">
                    {currentTrack && (
                        <div className='current-track'>
                            <img src={currentTrack.img_url} alt='Обложка трека' />
                            <div className='track-info'>
                                <h2>{currentTrack.title}</h2>
                                <p>Исполнитель: {currentTrack.author}</p>
                                <p>Альбом: {currentTrack.album}</p>
                            </div>
                            <div className="controls">
                                <FontAwesomeIcon icon={faThumbsUp} onClick={handleLike} style={{ color: liked ? '#4CAF50' : '#ddd', cursor: liked ? 'not-allowed' : 'pointer', fontSize: '25px' }} />
                                <FontAwesomeIcon icon={faThumbsDown} onClick={handleDislike} style={{ color: disliked ? '#f44336' : '#ddd', cursor: disliked ? 'not-allowed' : 'pointer', fontSize: '25px' }} />
                            </div>
                            <audio controls onPlay={handlePlay}>
                                <source src='https://pu.xpradio.ru:4085/radio?x=1708082261842' type='audio/mpeg' />
                            </audio>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Player;
