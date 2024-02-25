import React from 'react';
import Player from '../core/player/Player';
import Info from '../core/info/Info';
import Zayavka from '../core/zayavka/Zayavka';
import MainBestWorst from './MainBestWorst';
import { PlayerProvider } from '../core/player/PlayerContext';

function Home() {
    return (
        <div>
            <PlayerProvider>
                {/* <Player /> */}
                <Info />
                <MainBestWorst />
                <Zayavka />
            </PlayerProvider>
        </div>
    );
}

export default Home;