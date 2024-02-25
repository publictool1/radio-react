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
                    <p className='dama'>Скачайте наше мобильное приложение для удобного доступа к музыкальному контенту, возможностям заказа песен, оценки треков и другим функциям. Будьте в курсе последних новинок и получайте уведомления о новых релизах и акциях.</p>
                    <a href="https://xpradio.ru/wp-content/uploads/2024/02/app-release.apk" download className="download-button">Скачать приложение</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
