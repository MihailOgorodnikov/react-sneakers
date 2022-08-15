import React from 'react';
import Card from "../components/Card";
import {AppContext} from "../App";


function Fevorits () {
  const {favorits, onAddToFavorits} = React.useContext(AppContext);
    return (
        <div className="content p-40">
        <div className="d-flex mb-40 align-center justify-between">
           <h1>Мои закладки</h1>

        </div>
       
        <div className="d-flex justify-around flex-wrap">  
        {favorits.map((item, index)=>(
             <Card 
                key={index} 
                favorited={true}
                onFavorite={onAddToFavorits}
                {...item}
              />  
          ))}
        </div>
        
      </div>
    )
}

export default Fevorits;


