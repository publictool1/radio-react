import React from 'react';
import Info from './info/Info';
import MainBestWorst from '../components/MainBestWorst';

function Concl(props) {
    return (
        <div className='concl'>
                <Info />
                <MainBestWorst />
        </div>
    );
}

export default Concl;