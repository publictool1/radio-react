import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './core/header/Header';
import Home from './components/Home';
import About from './components/About';
import Footer from './core/footer/Footer';
import Chart from './components/Chart';
import Best from './components/all_best/Best'
import Worst from './components/all_worst/Worst'

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
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={< About />} />
          <Route path="/chart" element={< Chart />} />
          <Route path="/all-best" element={< Best />} />
          <Route path="/all-wrost" element={< Worst />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
