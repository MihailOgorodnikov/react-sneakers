import React from 'react';


function Card ({ id, onFavorite, imageUrl, name, price, onPluse, favorited = false}) {
    const [isAdded, setIsAdded] = React.useState(false);
    const [isFavorit, setIsFavorit] = React.useState(favorited);

    const onClikePluse = () => {
        onPluse({imageUrl, name, price});
        setIsAdded(!isAdded);
    }

    const onClikeFavorit = () => {
        onFavorite({id, imageUrl, name, price});
        setIsFavorit(!isFavorit);
    }

    return (
        <div className="card">
            <div className="favorite" onClick={onClikeFavorit}>
                <img src={isFavorit ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="unliked" />
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