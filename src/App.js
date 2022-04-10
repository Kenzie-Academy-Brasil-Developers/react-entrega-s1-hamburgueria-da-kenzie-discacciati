import logo from "./logo.svg";
import "./App.css";
import "./Reset.css";
import { useEffect, useState } from "react";
import ProductsList from "./components/ProductsList";
import axios from "axios";
import Cart from "./components/Cart";
import logoBurguer from "./assets/img/BurguerKenzie.svg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [erro, setErro] = useState(false);
  const [currentSale, setCurrentSale] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios
        .get("https://hamburgueria-kenzie-json-serve.herokuapp.com/products")
        .catch((err) => {
          setErro(true);
        });
      setProducts(response.data);
      console.log(response.data);
      console.log(products);
    }
    fetchProducts();
  }, []);

  const Schema = yup.object().shape({
    pesquisa: yup.string().required(""),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(Schema),
  });

  const showProducts = (data) => {
    console.log(data);
    setFilteredProducts(
      products.filter(
        (element) =>
          element.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "").toLowerCase() ===
            data.pesquisa
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "").toLowerCase() ||
          element.category
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "").toLowerCase() ===
            data.pesquisa
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "").toLowerCase()
      )
    );
    setSearch(data.pesquisa);

  };

  const handleClick = (id) => {
    sumProductCart();
    currentSale.find((element) => element.id === id)
      ? setCurrentSale(currentSale)
      : setCurrentSale([
          ...currentSale,
          products.find((element) => element.id === id),
        ]);
  };
  const sumProductCart = () => {
    setCartTotal(currentSale.reduce((acc, item) => item.price + acc, 0));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Header">
          <img className="ImgLogo" src={logoBurguer} alt="Logo" />
          <form
            className="FormSearch"
            type="submit"
            onSubmit={handleSubmit(showProducts)}
          >
            <input
              className="InputSearch"
              type="text"
              placeholder="Digitar Pesquisar"
              {...register("pesquisa")}
            />
            <button className="btnInputSearch" type="submit">
              Pesquisar
            </button>
          </form>
        </div>
      </header>

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
          cartTotal={cartTotal}
          setCartTotal={setCartTotal}
        />
      </main>
    </div>
  );
}

export default App;
