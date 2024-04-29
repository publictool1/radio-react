import React from 'react';
import './RadioInfo.css';

function RadioInfo() {
    return (
        <div className="radio-info">
            <div className="icon">
                <img src='/images/communion.gif' alt="Radio Icon" />
                <img src='/images/holyfamily.gif' alt="Radio Icon" />
            </div>
            <div className="text">
                <h3>Христианская песня</h3>
                <p>Только лучшие песни, наполненные вдохновением и духовной силой, звучат здесь. Мы собрали для вас музыкальные произведения, которые приносят утешение и вдохновляют к духовному росту.</p>
                <p>Давайте вместе погрузимся в атмосферу гармонии и покоя, которые приносят звуки Христианского радио. Здесь каждая нота становится мостом к светлому будущему.</p>
            </div>
        </div>
    );
}

export default RadioInfo;
