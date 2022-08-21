import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header";
import Drawer from "./components/Drawer";

import Home from './pages/Home';
import Fevorits from './pages/Favorits';
import Orders from './pages/Orders';

export const AppContext = React.createContext({});

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorits, setFavorits] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpen, setCartOpen] = React.useState(false);
  const [isLoyding, setIsLoyding] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
        const cartResponse = await axios.get('https://62f4d5e7ac59075124c4e906.mockapi.io/cart');
        const favoritsResponse = await axios.get('https://62f4d5e7ac59075124c4e906.mockapi.io/favorits');
        const itemsResponse = await axios.get('https://62f4d5e7ac59075124c4e906.mockapi.io/items');

        setIsLoyding(false);

        setCartItems(cartResponse.data);
        setFavorits(favoritsResponse.data);
        setItems(itemsResponse.data);
    }
    fetchData();
      
  },[]);

    const onAddToCart = async (obj) => {
      try {
        const findItem = cartItems.find((item) => Number(item.parentId) == Number(obj.id));
        if(findItem){
          setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
          axios.delete(`https://62f4d5e7ac59075124c4e906.mockapi.io/cart/${findItem.id}`);
        }else{
          const { data } = await axios.post('https://62f4d5e7ac59075124c4e906.mockapi.io/cart', obj);
          setCartItems((prev) => [...prev, data]);
        }
      } catch (error) {
        alert('Неудалось');
      }
      
    };

    const onChangeSearchInput = (event) => {
      setSearchValue(event.target.value);
      
    };

    const onRemoveItem = (id) => {
      axios.delete(`https://62f4d5e7ac59075124c4e906.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter(item => item.id !== id));
    };

    const onAddToFavorits = async (obj) => {
      try{
        if(favorits.find((favObj) => Number(favObj.id) == Number(obj.id))){
          axios.delete(`https://62f4d5e7ac59075124c4e906.mockapi.io/favorits/${obj.id}`);
          setFavorits((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)));
        }else{
          const {data} = await axios.post('https://62f4d5e7ac59075124c4e906.mockapi.io/favorits', obj);
          setFavorits((prev) => [...prev, data]);
        }
      } catch (error) {
        alert('Неудалось');
      }
    };
  
    const isItemAdded = (id) => {
      return cartItems.some((obj) => Number(obj.parentId) == Number(id));
    };

  return (
   <AppContext.Provider value={{items, cartItems, favorits, isItemAdded, onAddToFavorits, onAddToCart, setCartOpen, setCartItems}}>
      <div className="Wrapper clear">
        {cartOpen && <Drawer items = {cartItems} onClose = {() => setCartOpen(false)} onRemove = {onRemoveItem}/>}
        
        <Header onClikeCart = {() => setCartOpen(true)} />

        
        <Route  path="/" exact>  
          <Home 
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorits={onAddToFavorits}
              onAddToCart={onAddToCart}
              isLoyding={isLoyding}
            />
           </Route>
         
           <Route  path="/favorits" exact>  
            <Fevorits />
           </Route>

           <Route  path="/orders" exact>  
            <Orders />
           </Route>
        
    
      
    </div>
   </AppContext.Provider>

     
  );
  
}

export default App;
