import React from 'react';
import Card from "./components/Card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
    fetch('https://62f4d5e7ac59075124c4e906.mockapi.io/items')
      .then((res) => {
        return res.json();
      }).then((json) => {
        setItems(json);
      });
  },[]);

    const onAddToCart = (obj) => {
      setCartItems(prev => [...prev, obj]);
    }
  

  return (
    <div className="Wrapper clear">
        {cartOpen && <Drawer items = {cartItems} onClose = {() => setCartOpen(false)}/>}
        <Header onClikeCart = {() => setCartOpen(true)} />
      

      <div className="content p-40">
        <div className="d-flex mb-40 align-center justify-between">
           <h1>Все кроссовки</h1>
           <div className="search-block d-flex">
              <img src="/img/searh.svg" alt="search" />
              <input placeholder="Поиск..." />
           </div>
        </div>
       
        <div className="d-flex justify-around flex-wrap">  
          {items.map((item)=>(
             <Card 
                name={item.name} 
                price={item.price} 
                imageUrl={item.imageUrl} 
                onFavorite={() => console.log('evev')}
                onPluse={(obj) => onAddToCart(obj)}
              />  
          ))}
                  
        </div>
        
      </div>

    </div>
  );
}

export default App;
