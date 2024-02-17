import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Worst.css';

// Путь к изображению аватарки по умолчанию
const defaultImage = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png';

function Worst(props) {
    const [wrostTracks, setWrostTracks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const tracksPerPage = 20;

    useEffect(() => {
        const tracks = async () => {
            try {
                const response = await axios.get('https://pu.xpradio.ru:1030/api/v2/track_stats/worst/?server=1');
                if (response.status === 200 && response.data.length > 0) {
                    setWrostTracks(response.data);
                    console.log(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };
        tracks();
    }, []);

    // Logic for displaying current tracks
    const indexOfLastTrack = currentPage * tracksPerPage;
    const indexOfFirstTrack = indexOfLastTrack - tracksPerPage;
    const currentTracks = wrostTracks.slice(indexOfFirstTrack, indexOfLastTrack);

    // Logic for changing page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='worst-container'>
            <h1>Песни которые пользовател оценили хуже всего</h1>
            <div className="worst-content">
                <div className="worst-s">
                    {currentTracks.map((track, index) => (
                        <div className="worst-single-s" key={index}>
                            <div className="bset-img">
                                <img src={track.image_medium ? 'https://pu.xpradio.ru:1030' + track.image_medium : defaultImage} alt="Обложка" />
                            </div>
                            <div className="worst-info">
                                <h2>{track.title}</h2>
                                <p>{track.author}</p>
                                <p>{track.album}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination
                    tracksPerPage={tracksPerPage}
                    totalTracks={wrostTracks.length}
                    paginate={paginate}
                />
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

export default Worst;
