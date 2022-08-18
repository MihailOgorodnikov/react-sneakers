import React from "react";
import Info from "./Info";
import axios from 'axios';
import { AppContext } from "../App";

const delay = (ms) => new Promise ((resolve) => setTimeout(resolve, ms));

function Drawer ({onClose, onRemove, items = [] }) {
    const {cartItems, setCartItems} = React.useContext(AppContext);
    const [orderId, setOrderId] = React.useState(null);
    const [isOrderComplete, setIsOrderComplete] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const totalPrise = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    const onClikOrder = async () => {
      try {
        setIsLoading(true);
        const {data} = await axios.post('https://62f4d5e7ac59075124c4e906.mockapi.io/orders', {items: cartItems});
        
        setOrderId(data.id);
        setIsOrderComplete(true);
        setCartItems([]);

        for (let i = 0; i < cartItems.length; i++){
          const item = cartItems[i];
          await axios.delete('https://62f4d5e7ac59075124c4e906.mockapi.io/cart/' + item.id);
          await delay(1000);
        }
        
      } catch (error) {
        alert('Неудалось');
      }
      setIsLoading(false);
    };

    return (
      <div className="overlay">
          <div className="drawer">
          <h2 className="d-flex justify-between mb-30">Корзина
            <img onClick={onClose} className="cu-p" src="/img/btn-remuve.svg" />
          </h2>


          {
            items.length > 0 ? 
            <div className="d-flex flex-column flex">
            <div className="items">
            {items.map((obj) => (
              <div key={obj.id} className="cartItem d-flex align-center mb-20">
              <img className="mr-20" width={70} height={70} src={obj.imageUrl} />
              <div className="mr-20">
                <p className="mb-5">{obj.name}</p>
                <b>{obj.price} руб.</b>
              </div>
              <img onClick={() => onRemove(obj.id)} className="remuveBtn" src="/img/btn-remuve.svg" />
            </div>
            ))}
          </div>
          <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrise} руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>{(totalPrise / 100) * 5} руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClikOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
          </div>
            </div> :
          (<Info 
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"} 
            image={isOrderComplete ? "/img/complit-order.jpg" : "/img/empty-column.jpg"} 
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавить хотя бы одну пару кросовок, Чтобы сделать заказ."}/>
            )
          
          }
        </div>
      </div>
        
    );
}

export default Drawer;