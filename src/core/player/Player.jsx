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
        isLoading,
        audioRef,
        defaultImage,
        handlePlayPause,
    } = usePlayer();

    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(false);
    const marqueeRef = useRef(null);
    const [coverColorStart, setCoverColorStart] = useState("#3F51B5"); 
    const [coverColorEnd, setCoverColorEnd] = useState("#64B5F6"); 

    useEffect(() => {
        setIsHomePage(location.pathname === "/");
    }, [location.pathname]);

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

    const isColorWhiteOrBlack = (color) => {
        const rgb = color
            .substring(4, color.length - 1)
            .replace(/ /g, '')
            .split(',');
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        return (r === 255 && g === 255 && b === 255) || (r === 0 && g === 0 && b === 0);
    }
    
    useEffect(() => {
        if (currentTrack && currentTrack.img_url) {
            const image = new Image();
            image.crossOrigin = "Anonymous"; 
            image.src = currentTrack.img_url;
            image.onload = () => {
                const tempCanvas = document.createElement('canvas');
                const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });                
                tempCanvas.width = image.width;
                tempCanvas.height = image.height;
                ctx.drawImage(image, 0, 0, image.width, image.height);
                const pixelDataStart = ctx.getImageData(0, 0, 1, 1).data;
                const pixelDataEnd = ctx.getImageData(image.width - 1, image.height - 1, 1, 1).data;
                const colorStart = `rgb(${pixelDataStart[0]}, ${pixelDataStart[1]}, ${pixelDataStart[2]})`;
                const colorEnd = `rgb(${pixelDataEnd[0]}, ${pixelDataEnd[1]}, ${pixelDataEnd[2]})`;
                if (!isColorWhiteOrBlack(colorStart) && !isColorWhiteOrBlack(colorEnd)) {
                    setCoverColorStart(colorStart);
                    setCoverColorEnd(colorEnd);
                } else {
                    setCoverColorStart("#3F51B5");
                    setCoverColorEnd("#64B5F6");
                }
            };
        } else {
            setCoverColorStart("#3F51B5");
            setCoverColorEnd("#64B5F6");
        }
    }, [currentTrack]);
    
    return (
        <div className="player-container" style={{ background: `linear-gradient(to right, ${coverColorStart}, ${coverColorEnd})` }}>
            {isLoading ? (
                <div className="loading-message">Подождите, пока не загрузится плеер</div>
            ) : (
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
                                <div className="button-play" onClick={handlePlayPause}>
                                    <FontAwesomeIcon
                                        icon={isPlaying ? faPause : faPlay}
                                        className="play-pause"
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
            )}
        </div>
    );
}

export default Player;
