import React, { useState } from 'react';
import './Zayavka.css';

function Zayavka() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [songRequest, setSongRequest] = useState('');

    const handleSubmit = (e) => {
    };

    return (
        <div className='song-container'>
            <div className='song-text'>
                <h2>Хотите заказать песню?</h2>
                <p>Заполните информацию, чтобы отправить свой запрос!</p>
            </div>
            <div className='song-request-widget'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} />
                    <textarea placeholder="Сообщение" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    <input type="text" placeholder="Желаемая песня" value={songRequest} onChange={(e) => setSongRequest(e.target.value)} />
                    <button type="submit">Отправить</button>
                </form>
            </div>
        </div>
    );
}

export default Zayavka;
