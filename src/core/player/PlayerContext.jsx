import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);
    const [isLoading, setIsLoading] = useState(true);
    const [streamUrl, setStreamUrl] = useState('');
    const audioRef = useRef(null);
    const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png';
    const [recentSongs, setRecentSongs] = useState([]);

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
                setStreamUrl(track.stream_url); 
                setIsLoading(false);
                updateRecentSongs(track);
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

        const updateRecentSongs = (track) => {
        setRecentSongs(prevSongs => [track, ...prevSongs.slice(0, 3)]);
    };


    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
        audioRef.current.volume = parseFloat(e.target.value) / 100;
    };

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                volume,
                isLoading,
                audioRef,
                defaultImage,
                streamUrl,
                handlePlayPause,
                handleVolumeChange,
                recentSongs
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);
