import React from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from './pages/Home';
import Fevorits from './pages/Favorits';


function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorits, setFavorits] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpen, setCartOpen] = React.useState(false);

  React.useEffect(() => {
      axios.get('https://62f4d5e7ac59075124c4e906.mockapi.io/items').then((res) => {
        setItems(res.data);
      });
      axios.get('https://62f4d5e7ac59075124c4e906.mockapi.io/cart').then((res) => {
        setCartItems(res.data);
      });
      axios.get('https://62f4d5e7ac59075124c4e906.mockapi.io/favorits').then((res) => {
        setFavorits(res.data);
      });
  },[]);

    const onAddToCart = (obj) => {
      axios.post('https://62f4d5e7ac59075124c4e906.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
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
        if(favorits.find((favObj) => favObj.id == obj.id)){
          axios.delete(`https://62f4d5e7ac59075124c4e906.mockapi.io/favorits/${obj.id}`);
          setFavorits((prev) => prev.filter(item => item.id !== obj.id));
        }else{
          const {data} = await axios.post('https://62f4d5e7ac59075124c4e906.mockapi.io/favorits', obj);
          setFavorits((prev) => [...prev, data]);
        }
      } catch (error) {
        alert('Неудалось');
      }
    };
  

  return (
    <div className="Wrapper clear">
        {cartOpen && <Drawer items = {cartItems} onClose = {() => setCartOpen(false)} onRemove = {onRemoveItem}/>}
        
        <Header onClikeCart = {() => setCartOpen(true)} />

        
        <Route  path="/" exact>  
          <Home 
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorits={onAddToFavorits}
              onAddToCart={onAddToCart}
            />
           </Route>
         
           <Route  path="/favorits" exact>  
            <Fevorits 
              items={favorits} 
              onAddToFavorits={onAddToFavorits}
              />
           </Route>
        
    
      
    </div>

     
  );
  
}

export default App;
