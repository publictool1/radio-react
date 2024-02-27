import React, { useEffect, useState } from 'react';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { usePlayer } from './PlayerContext';
import { useLocation } from 'react-router-dom';
import SmallPlayer from './SmallPlayer';

function Player() {
    const {
        currentTrack,
        liked,
        disliked,
        isPlaying,
        volume,
        isLoading,
        audioRef,
        defaultImage,
        handlePlayPause,
        handleLike,
        handleDislike,
        handleVolumeChange,
    } = usePlayer();

    const location = useLocation();
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(location.pathname === "/");
    }, [location.pathname]);

    if (isLoading) {
        return (
            <div className="player-container">
                <div className="loading-message">Подождите, пока не загрузится плеер</div>
            </div>
        );
    } else if (isHomePage && currentTrack) {
        return (
            <div className="player-container">
                <div className="player-content">
                    <div className="current-track">
                        <div className="controls">
                            <div className="icons">
                                <h1 className='efir'>Сейчас в эфире</h1>
                                <div className="track-info-p">
                                    <h2>{currentTrack.title}</h2>
                                    <p>Автор: {currentTrack.author}</p>
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
                                <img src={currentTrack.img_url || defaultImage} alt="Track cover" />
                            </div>
                            <audio ref={audioRef} autoPlay={isPlaying}>
                                <source src='https://pu.xpradio.ru:4085/radio?x=1708082261842' type='audio/mpeg' />
                            </audio>
                        </div>
                    </div>
                </div>
            );
    } else if (!isHomePage && currentTrack) {
        return (
            <SmallPlayer />
        );
    } else {
        return null;
    }
}

export default Player;
