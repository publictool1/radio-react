// App.js

import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PlayerProvider } from './core/player/PlayerContext'; // Импортируем PlayerProvider
import Player from './core/player/Player';
import './App.css' // Импортируем компонент Player

function App() {

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
        <PlayerProvider>
          <Player /> 
        </PlayerProvider>
      </div>
    </Router>
  );
}

export default App;
