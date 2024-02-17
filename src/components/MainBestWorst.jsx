import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/MainBestWorst.css'
import { Link } from 'react-router-dom';

function MainBestWorst(props) {
    const [bestTracks, setBestTracks] = useState([])
    const [wrostTracks, setWrostTracks] = useState([]);

    useEffect(() => {
        const fetchBestTracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/best/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setBestTracks(response.data.slice(0, 3)); // Ограничиваем до 4 элементов
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        }
        fetchBestTracks();
    }, []);

    useEffect(() => {
        const tracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/worst/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setWrostTracks(response.data.slice(0, 3));
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        tracks();
    }, []);
    return (
        <div className='twise'>
        <div className="best">
            <h1 className="section-title">Лучшие песни</h1>
            <p className='ps'>песни с наивысшим рейтингом</p>
            {bestTracks.map((track, index) => (
                <div className="best-single" key={index}>
                    <div className="best-img">
                        <img src={'https://pu.xpradio.ru:1030' + track.image_medium} alt="Обложка" />
                    </div>
                    <div className="best-info">
                        <h2>{track.title}</h2>
                        <p>{track.author}</p>
                        <p>{track.album}</p>
                    </div>
                </div>
            ))}
            <div className="link-container">
                <Link to='/all-best'>Посмотреть весь список песен</Link>
            </div>
        </div>
        <div className="worst">
            <h1 className="section-title">Худшие песни</h1>
            <p className='ps'>песни с низшим рейтингом</p>
            {wrostTracks.map((track, index) => (
                <div className="worst-single" key={index}>
                    <div className="worst-img">
                        <img src={'https://pu.xpradio.ru:1030' + track.image_medium} alt="Обложка" />
                    </div>
                    <div className="worst-info">
                        <h2>{track.title}</h2>
                        <p>{track.author}</p>
                        <p>{track.album}</p>
                    </div>
                </div>
            ))}
            <div className="link-container">
                <Link to='/all-wrost'>Посмотреть весь список песен</Link>
            </div>
        </div>
    </div>
    
    );
}

export default MainBestWorst;