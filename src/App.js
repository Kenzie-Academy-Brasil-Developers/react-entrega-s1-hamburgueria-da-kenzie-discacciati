import logo from "./logo.svg";
import "./App.css";
import "./Reset.css"
import { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import axios from "axios";
import Cart from "./components/Cart";
import logoBurguer from "./assets/img/BurguerKenzie.svg";
import { useForm } from "react-hook-form";
import * as yup from "yup"; 
import { yupResolver } from '@hookform/resolvers/yup'; 


function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [erro, setErro] = useState(false);
  const [currentSale, setCurrentSale] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios
        .get("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
        .catch((err) => {
          setErro(true);
        });
      setProducts(response.data);
      console.log(response.data);
      console.log(products)
    
    }
    fetchProducts();
  }, []);

  const Schema = yup.object().shape({
    pesquisa: yup.string().required(""),
  });

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(Schema),
  }); 

  const showProducts = (data) => {
    console.log(data)
    setFilteredProducts(products.filter((element)=>element.name.toLowerCase()=== data.pesquisa))
    
  }; 
 
  const handleClick = (id) => {
    sumProductCart()
    currentSale.find((element)=> element.id === id)
      ? setCurrentSale(currentSale)
      : setCurrentSale([...currentSale, products.find((element) => element.id === id)])
   
  }
  const sumProductCart = () => {
    setCartTotal(currentSale.reduce((acc, item)=> item.price + acc, 0));   
  }

  return (
    <div className="App">
      <header className="App-header">
        <img className="ImgLogo" src={logoBurguer} alt="Logo"/>       
        <form className="FormSearch" type="submit" onSubmit={handleSubmit(showProducts)}>
          <input
            className="InputSearch"
            type="text"
            placeholder="Digitar Pesquisar"
            {...register("pesquisa")}
          />
          <button className="btnInputSearch" type="submit">Pesquisar</button> 
        </form> 
      </header>

      <main className="main">
        <ProductsList products={filteredProducts === [] 
            ? products 
            : filteredProducts } 
            handleClick={handleClick} /> 
        <Cart currentSale={currentSale} setCurrentSale={setCurrentSale} cartTotal={cartTotal} setCartTotal={setCartTotal} /> 
      </main>
    </div>
  );
}

export default App;
