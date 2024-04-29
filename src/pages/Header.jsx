import React from 'react';
import './Header.css'; 

function Header() {
    return (
        <header className="header-container">
            <img src="https://xpradio.ru/wp-content/uploads/2024/01/cropped-ЛОГО_Радио_Христианская_Песня.png" alt="Христианская Радио" className="logo" />
            <h1 className="title">Христианская песня</h1>
        </header>
    );
}

export default Header;
