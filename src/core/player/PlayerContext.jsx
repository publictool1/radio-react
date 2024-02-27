import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isLoading, setIsLoading] = useState(true);
    const [streamUrl, setStreamUrl] = useState(''); // Добавляем состояние для URL потока
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
                const track = response.data.results[0];
                setCurrentTrack(track);
                setStreamUrl(track.stream_url); // Обновляем URL потока
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Ошибка загрузки данных о текущем треке:', error);
            setIsLoading(false);
        }
    };    

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
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
        <PlayerContext.Provider
            value={{
                currentTrack,
                liked,
                disliked,
                isPlaying,
                volume,
                isLoading,
                audioRef,
                defaultImage,
                streamUrl,
                handlePlayPause,
                handleLike,
                handleDislike,
                handleVolumeChange,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
