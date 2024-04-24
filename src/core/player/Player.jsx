import React, { useEffect, useState, useRef } from 'react';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from './PlayerContext';
import { useLocation } from 'react-router-dom';

function Player() {
    const {
        currentTrack,
        isPlaying,
        volume,
        isLoading,
        audioRef,
        defaultImage,
        handlePlayPause,
        handleVolumeChange,
    } = usePlayer();

    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(false);
    const marqueeRef = useRef(null);
    const [coverColorStart, setCoverColorStart] = useState("#3F51B5"); // Начальный цвет градиента по умолчанию
const [coverColorEnd, setCoverColorEnd] = useState("#64B5F6"); // Конечный цвет градиента по умолчанию


    useEffect(() => {
        setIsHomePage(location.pathname === "/");
    }, [location.pathname]);

    const isColorTooDarkOrLight = (color) => {
        // Эта функция проверяет, является ли цвет слишком темным или светлым.
        const rgb = color
            .substring(4, color.length - 1)
            .replace(/ /g, '')
            .split(',');
        const brightness = Math.round(
            (parseInt(rgb[0]) * 299 +
            parseInt(rgb[1]) * 587 +
            parseInt(rgb[2]) * 114) / 1000
        );
        return brightness > 200 || brightness < 50; // Значения можно настроить по своему усмотрению
    }
    
    // ...
    
    useEffect(() => {
        if (currentTrack && currentTrack.img_url) {
            const image = new Image();
            image.crossOrigin = "Anonymous"; // Указываем, что изображение является открытым для кросс-доменных запросов
            image.src = currentTrack.img_url;
            image.onload = () => {
                const tempCanvas = document.createElement('canvas');
                const ctx = tempCanvas.getContext('2d');
                tempCanvas.width = image.width;
                tempCanvas.height = image.height;
                ctx.drawImage(image, 0, 0, image.width, image.height);
                const pixelDataStart = ctx.getImageData(0, 0, 1, 1).data;
                const pixelDataEnd = ctx.getImageData(image.width - 1, image.height - 1, 1, 1).data;
                const colorStart = `rgb(${pixelDataStart[0]}, ${pixelDataStart[1]}, ${pixelDataStart[2]})`;
                const colorEnd = `rgb(${pixelDataEnd[0]}, ${pixelDataEnd[1]}, ${pixelDataEnd[2]})`;
                if (!isColorTooDarkOrLight(colorStart) && !isColorTooDarkOrLight(colorEnd)) {
                    setCoverColorStart(colorStart);
                    setCoverColorEnd(colorEnd);
                } else {
                    // Если цвет слишком темный или светлый, использовать цвета по умолчанию
                    setCoverColorStart("#3F51B5");
                    setCoverColorEnd("#64B5F6");
                }
            };
        } else {
            // Если нет обложки, использовать цвета по умолчанию
            setCoverColorStart("#3F51B5");
            setCoverColorEnd("#64B5F6");
        }
    }, [currentTrack]);

    useEffect(() => {
    const marqueeText = marqueeRef.current;
    if (marqueeText) {
        const marqueeContainer = marqueeText.parentNode;
        if (marqueeText.offsetWidth > marqueeContainer.offsetWidth) {
            marqueeText.classList.add('marquee');
        } else {
            marqueeText.classList.remove('marquee');
        }
    }
}, [currentTrack]);

    

    const updateRangeStyles = () => {
        const volumeInput = document.querySelector('.volume-control input[type="range"]');
        if (volumeInput) {
            const value = (volumeInput.value - volumeInput.min) / (volumeInput.max - volumeInput.min) * 100;
            volumeInput.style.setProperty('--value', value);
        }
    }

    const handleVolumeChangeWithStyles = (e) => {
        handleVolumeChange(e);
        updateRangeStyles();
    }

    useEffect(() => {
        updateRangeStyles();
    }, [volume]);

    if (isLoading) {
        return (
            <div className="player-container">
                <div className="loading-message">Подождите, пока не загрузится плеер</div>
            </div>
        );
    } else {
        return (
            <div className="player-container" style={{ background: `linear-gradient(to right, ${coverColorStart}, ${coverColorEnd})` }}>
                <div className="player-content">
                    <div className="left">
                        <div className="info_efir">
                            <h1 className='efir'>Сейчас в эфире</h1>
                            <div className="track-info-p">
                                <div className="marquee-container">
                                <h2 ref={marqueeRef} className="marquee">{currentTrack && currentTrack.title}</h2>
                                </div>
                                <p>{currentTrack && currentTrack.author}</p>
                            </div>

                            <div className="vo">
                                <div className="button-play">
                                    <FontAwesomeIcon
                                        icon={isPlaying ? faPause : faPlay}
                                        onClick={handlePlayPause}
                                        className="play-pause"
                                    />
                                </div>
                                <div className="volume-control">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="1"
                                        value={volume}
                                        onChange={handleVolumeChangeWithStyles}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="image-current_track">
                            <img src={currentTrack && currentTrack.img_url ? currentTrack.img_url : defaultImage} alt="Track cover" />
                        </div>
                        <audio ref={audioRef} autoPlay={isPlaying}>
                            <source src='https://pu.xpradio.ru:4085/radio?x=1708082261842' type='audio/mpeg' />
                        </audio>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
