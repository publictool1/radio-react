import React from 'react';
import Player from '../core/player/Player';
import Info from '../core/info/Info';
import Zayavka from '../core/zayavka/Zayavka';
import MainBestWorst from './MainBestWorst';

function Home() {
    return (
        <div>
            <Player />
            <Info />
            <MainBestWorst />
            <Zayavka />
        </div>
    );
}

export default Home;