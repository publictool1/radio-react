import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Best.css';

function Best(props) {
    const [bestTracks, setBestTracks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tracksPerPage = 20;
    const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png'; // Ссылка на изображение по умолчанию

    useEffect(() => {
        const fetchBestTracks = async () => {
            try {
                const response = await axios.get(`https://pu.xpradio.ru:1030/api/v2/track_stats/best/?server=1`);
                if (response.status === 200 && response.data.length > 0) {
                    setBestTracks(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchBestTracks();
    }, []);

    // Logic for displaying current tracks
    const indexOfLastTrack = currentPage * tracksPerPage;
    const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
    const currentTracks = bestTracks.slice(indexOfFirstTrack, indexOfLastTrack);

    // Logic for changing page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='best-container'>
            <h1>Песни которые хорошо оценили пользователи</h1>
            <div className="best-content">
                <div className="best-all">
                    {currentTracks.map((track, index) => (
                        <div className="best-single-s" key={index}>
                            <div className="bset-img">
                                <img src={track.image_medium ? `https://pu.xpradio.ru:1030${track.image_medium}` : defaultImage} alt="Обложка" />
                            </div>
                            <div className="best-info">
                                <h2>{track.title}</h2>
                                <p>{track.author}</p>
                                <p>{track.album}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pagi">
                    <Pagination
                        tracksPerPage={tracksPerPage}
                        totalTracks={bestTracks.length}
                        paginate={paginate}
                    />
                </div>
            </div>
        </div>
    );
}

const Pagination = ({ tracksPerPage, totalTracks, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalTracks / tracksPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={() => paginate(number)} className='page-link'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Best;
