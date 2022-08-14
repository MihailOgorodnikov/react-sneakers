function Drawer ({onClose, onRemove, items = [] }) {
    return (
      <div className="overlay">
          <div className="drawer">
          <h2 className="d-flex justify-between mb-30">Корзина
            <img onClick={onClose} className="cu-p" src="/img/btn-remuve.svg" />
          </h2>


          {
            items.length > 0 ? 
            <div>
              
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
                  <b>21 489 руб.</b>
                </li>
                <li>
                  <span>Налог 5%</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
          </div>
            </div> :
          (<div className="cartEmpty d-flex align-center flex-column flex">
            <img className="mb-20" width={120} height={120} src="/img/empty-column.jpg" alt="" />
            <h2>Корзина пуста</h2>
            <p className="opacity-6">Добавить хотя бы одну пару кросовок, Чтобы сделать заказ.</p>
            <button onClick={onClose} class="greenButton">
              <img src="/img/arrow.svg" />
              Вернуться назад
            </button>
          </div>)
          
          }
        </div>
      </div>
        
    );
}

export default Drawer;