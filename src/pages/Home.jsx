import Card from "../components/Card";

function Home ({items, searchValue, setSearchValue, onChangeSearchInput, onAddToFavorits, onAddToCart}) {
    return (
        <div className="content p-40">
        <div className="d-flex mb-40 align-center justify-between">
           <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
           <div className="search-block d-flex">
              <img src="/img/searh.svg" alt="search" />
              {searchValue && <img onClick={()=>setSearchValue('')} className="clear cu-p" src="/img/btn-remuve.svg" />}
              <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
           </div>
        </div>
       
        <div className="d-flex justify-around flex-wrap">  
          {items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map((item, index)=>(
             <Card 
                key={index}
                onFavorite={(obj) => onAddToFavorits(obj)}
                onPluse={(obj) => onAddToCart(obj)}
                {...item}
              />  
          ))}
                  
        </div>
        
      </div>
    )
}

export default Home;


