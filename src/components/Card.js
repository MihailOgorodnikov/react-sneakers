import React from 'react';
import ContentLoader from 'react-content-loader';
import {AppContext} from "../App";

function Card ({ id, onFavorite, imageUrl, name, price, onPluse, favorited = false, loading=false}) {
    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorit, setIsFavorit] = React.useState(favorited);
    const obj = {id, parentId: id, imageUrl, name, price};

    const onClikePluse = () => {
        onPluse(obj);
    }

    const onClikeFavorit = () => {
        onFavorite(obj);
        setIsFavorit(!isFavorit);
    }

    return (
        <div className="card">
            {
                loading ? 
                <ContentLoader 
                    speed={2}
                    width={155}
                    height={265}
                    viewBox="0 0 155 265"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                    >
                    <rect x="1" y="0" rx="10" ry="10" width="155" height="155" /> 
                    <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
                    <rect x="1" y="187" rx="5" ry="5" width="100" height="15" /> 
                    <rect x="1" y="234" rx="5" ry="5" width="80" height="25" /> 
                    <rect x="124" y="230" rx="10" ry="10" width="32" height="32" /> 
                    
                </ContentLoader> : <>{onFavorite && <div className="favorite" onClick={onClikeFavorit}>
                <img src={isFavorit ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="unliked" />
            </div>}
        
            <img width={133} height={112}  src={imageUrl} />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                {onPluse && <img className="button" onClick={onClikePluse} src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} />}
            </div>
                </>
            }
            
       </div>
    );
}

export default Card;