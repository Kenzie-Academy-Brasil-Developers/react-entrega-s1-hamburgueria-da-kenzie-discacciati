import "./App.css";
import "./Reset.css";
import { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import axios from "axios";
import Cart from "./components/Cart";
import Header from "./components/Header";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [erro, setErro] = useState(false);
  const [currentSale, setCurrentSale] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios
        .get("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
        .catch((err) => {
          setErro(true);
        });
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  const handleClick = (produto) => {
    if(currentSale.find((element) => element.id === produto.id)){
    	const index = currentSale.indexOf(produto);
    	currentSale[index].quantity += 1;
      	setCurrentSale([...currentSale]);
    }
    else{
    	produto.quantity = 1 ;
    	setCurrentSale([...currentSale, produto]);
    }
     
  };

  return (
    <div className="App">
      <Header products={products} setFilteredProducts={setFilteredProducts} setSearch={setSearch}/>

      <main className="main">
        <div className="ContainerMain">
          {filteredProducts.length !== 0 ? (
            <div className="ResultSearch">
              <p>Resultado para:</p>
              <span className="NameResult">{search}</span>
            </div>
          ) : (
            <></>
          )}
          <ProductsList
            products={
              filteredProducts.length === 0 ? products : filteredProducts
            }
            handleClick={handleClick}
          />
        </div>
        <Cart
          currentSale={currentSale}
          setCurrentSale={setCurrentSale}
        />
      </main>
    </div>
  );
}

export default App;
