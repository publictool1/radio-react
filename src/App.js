// App.js

import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './core/header/Header';
import Footer from './core/footer/Footer';
import { PlayerProvider } from './core/player/PlayerContext'; // Импортируем PlayerProvider
import Player from './core/player/Player';
import './App.css' // Импортируем компонент Player

function App() {
  const Home = lazy(() => import('./components/Home'));
  const About = lazy(() => import('./components/About'));
  const Chart = lazy(() => import('./components/Chart'));
  const Best = lazy(() => import('./components/all_best/Best'));
  const Worst = lazy(() => import('./components/all_worst/Worst'));

  useEffect(() => {
    // Устанавливаем новый заголовок
    document.title = "Христианская песня";
    
    // Заменяем иконку во вкладке
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
          <Player /> {/* Плеер здесь, но вы можете решить, когда его отображать */}
        </PlayerProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/all-best" element={<Best />} />
            <Route path="/all-wrost" element={<Worst />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
