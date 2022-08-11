import React from 'react';
import './Card.module.scss';

function Card ({onFavorite, imageUrl, name, price, onPluse}) {
    const [isAdded, setIsAdded] = React.useState(false);

    const onClikePluse = () => {
        onPluse({imageUrl, name, price});
        setIsAdded(!isAdded);
    }

    return (
        <div className="card">
            <div className="favorite" onClick={onFavorite}>
                <img src="/img/heart-unliked.svg" alt="unliked" />
            </div>
        
            <img width={133} height={112}  src={imageUrl} />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className="button" onClick={onClikePluse} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} />
            </div>
       </div>
    );
}

export default Card;