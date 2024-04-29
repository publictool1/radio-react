import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section">
                <a href="https://t.me/xpradio" target="_blank" rel="noopener noreferrer">
                    <img src='/images/telegram.png' alt="Telegram Icon" />
                </a>
                <p>Подписывайтесь на Наш Telegram -</p>
                <p> @Христианская песня</p>
            </div>
            <div className="footer-section">
                <a href="https://xpradio.ru/wp-content/uploads/2024/02/app-release.apk" target="_blank" rel="noopener noreferrer">
                    <img src='/images/download2.gif' alt="App Icon" />
                </a>
                <p>Скачайте наше приложение для вашего телефона</p>
                <p>и наслаждайтесь любимой музыкой везде и всегда!</p>
            </div>
        </footer>
    );
}

export default Footer;
