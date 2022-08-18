import React from 'react';
import Card from "../components/Card";
import axios from 'axios';


function Orders () {
  const [orders, setOrders] = React.useState([]);
  const [isLoyding, setIsLoyding] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://62f4d5e7ac59075124c4e906.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoyding(false);
      } catch (error) {
        alert('Неудалось');
      }
    })();
  }, []);

    return (
        <div className="content p-40">
        <div className="d-flex mb-40 align-center justify-between">
           <h1>Мои заказы</h1>

        </div>
       
        <div className="d-flex justify-around flex-wrap">  
        {(isLoyding ? [...Array(4)] : orders).map((item, index)=>(
             <Card 
              key={index}
              loading = {isLoyding}
              {...item}
             />  
          ))}
        </div>
        
      </div>
    )
}

export default Orders;


