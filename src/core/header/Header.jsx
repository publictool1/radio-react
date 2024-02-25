import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className='header'>
            <div className="header-container">
                {/* <div className="logo">
                    <Link><h1>Христианская песня</h1></Link>
                </div> */}
                <div className="logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>
                <div className="links">
                    <Link to='/'>Главная</Link>
                    <Link to='/chart'>Чарт</Link>
                    <Link to='/about'>О нас</Link>
                    {/* <Link to='/'>Контакты</Link>  */}
                </div>
            </div>
        </div>
    );
}

export default Header;
