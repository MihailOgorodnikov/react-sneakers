import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  return (
    <div className="Wrapper clear">
        <Drawer />
        <Header />
      

      <div className="content p-40">
        <div className="d-flex mb-40 align-center justify-between">
           <h1>Все кроссовки</h1>
           <div className="search-block d-flex">
              <img src="/img/searh.svg" alt="search" />
              <input placeholder="Поиск..." />
           </div>
        </div>
       
        <div className="d-flex justify-around">
          <Card />
          <div className="card">
            <div className="favorite">
              <img src="/img/heart-unliked.svg" alt="unliked" />
            </div>
            
            <img width={133} height={112}  src="/img/sneakers/1.jpg" />
            <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Цена:</span>
                <b>12 999 руб.</b>
              </div>
              <button className="button">
              <img width={11} height={11} src="/img/plus.svg" />
              </button>
            </div>
           </div>
           
        </div>
        
      </div>

    </div>
  );
}

export default App;
