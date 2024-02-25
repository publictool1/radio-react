// SmallPlayer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from './PlayerContext';
import './SmallPlayer.css';

function SmallPlayer() {
    const {
        currentTrack,
        isPlaying,
        handlePlayPause,
        audioRef,
        defaultImage,
    } = usePlayer();

    const handleButtonClick = () => {
        if (audioRef.current) {
            handlePlayPause();
        }
    };

    return (
        <div className="small-player-container">
            {currentTrack && (
                <div className="small-player-content">
                    <div className="img-small">
                        <img src={currentTrack.img_url || defaultImage} alt="Track cover" />
                    </div>
                    <div className="small-player-info">
                        <h4>{currentTrack.title}</h4>
                        <p>{currentTrack.author}</p>
                    </div>
                    <div className="small-player-controls">
                        <button onClick={handleButtonClick}>
                            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                        </button>
                    </div>
                </div>
            )}
            <audio ref={audioRef} autoPlay={isPlaying}>
                <source src='https://pu.xpradio.ru:4085/radio?x=1708082261842' type='audio/mpeg' />
            </audio>
        </div>
    );
}

export default SmallPlayer;
