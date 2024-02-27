import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-image">
                    <img src="/images/course2.png" alt="cover" />
                </div>
                <div className="footer-info">
                    <p className='download-info'>Для удобства, скачайте наше мобильное приложение</p>
                    <p className='download-info'>для доступа к музыкальному контенту, заказа песен,</p>
                    <p className='download-info down'>оценки треков и другим функциям.</p>
                    <a href="https://xpradio.ru/wp-content/uploads/2024/02/app-release.apk" download className="download-button">Скачать приложение</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
