  import React, { useEffect} from 'react';
  import { BrowserRouter as Router} from 'react-router-dom';
  import { PlayerProvider } from './core/player/PlayerContext'; 
  import Player from './core/player/Player';
  import './App.css' 
  import Header from './pages/Header';
  import RecentSongs from './pages/FourSongs';
  import RadioInfo from './pages/RadioInfo';
import Footer from './pages/Footer';

  function App() {

    useEffect(() => {

      document.title = "Христианская песня";
      
      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = 'https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png';
      }
    }, []);

    return (
      <Router>
        <div className="App">
          <Header />
          <PlayerProvider>
            <Player /> 
            <RecentSongs />
          </PlayerProvider>
          <RadioInfo />
          <Footer />
        </div>
      </Router>
    );
  }

  export default App;
