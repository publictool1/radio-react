import React, { useState, useEffect, useRef } from 'react';
import './Player.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

function Player() {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50); // Добавляем состояние для громкости
    const [isLoading, setIsLoading] = useState(true); // Состояние для отслеживания загрузки трека
    const audioRef = useRef(null);
    const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png';

    useEffect(() => {
        const interval = setInterval(() => {
            fetchCurrentTrack();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const fetchCurrentTrack = async () => {
        try {
            const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/history/?limit=1&server=1');
            if (response.status === 200 && response.data.results.length > 0) {
                setCurrentTrack(response.data.results[0]);
                setIsLoading(false); // Устанавливаем isLoading в false, когда трек загрузился успешно
            }
        } catch (error) {
            console.error('Ошибка загрузки данных о текущем треке:', error);
            setIsLoading(true); // Если произошла ошибка загрузки трека, устанавливаем isLoading в true
        }
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
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

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
        audioRef.current.volume = parseFloat(e.target.value) / 100;
    };

    return (
        <div className="player-container">
            <div className="player-content">
                {isLoading ? ( // Проверяем isLoading, если true, то выводим сообщение "Подождите, скоро загрузится..."
                    <div className="loading-message">Подождите, скоро загрузится...</div>
                ) : (
                    currentTrack && (
                        <div className="current-track">
                            <div className="controls">
                                <div className="icons">
                                    <h1 className='efir'>Сейчас в эфире</h1>
                                    <div className="track-info">
                                        <h2>{currentTrack.title}</h2>
                                        <p>Исполнитель: {currentTrack.author}</p>
                                        <p>Альбом: {currentTrack.album}</p>
                                    </div>
                                    <div className="icon-dis_like">
                                        <FontAwesomeIcon
                                            icon={faThumbsUp}
                                            onClick={handleLike}
                                            className={liked ? 'liked' : ''}
                                            style={{ color: liked ? '#4CAF50' : '#ddd', cursor: liked ? 'not-allowed' : 'pointer', fontSize: '25px' }}
                                        />
                                        <FontAwesomeIcon
                                            icon={faThumbsDown}
                                            onClick={handleDislike}
                                            className={disliked ? 'disliked' : ''}
                                            style={{ color: disliked ? '#f44336' : '#ddd', cursor: disliked ? 'not-allowed' : 'pointer', fontSize: '25px' }}
                                        />
                                    </div>
                                </div>
                                <div className="vo">
                                    <FontAwesomeIcon
                                        icon={isPlaying ? faPause : faPlay}
                                        onClick={handlePlayPause}
                                        className="play-pause"
                                    />
                                    <div className="volume-control">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            step="1"
                                            value={volume}
                                            onChange={handleVolumeChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="image-current_track">
                                <img src={currentTrack.img_url || defaultImage} alt="Обложка трека" />
                            </div>
                            <audio ref={audioRef} autoPlay={isPlaying}>
                                <source src='https://pu.xpradio.ru:4085/radio?x=1708082261842' type='audio/mpeg' />
                            </audio>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Player;
