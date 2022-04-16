import logoBurguer from "../../assets/img/BurguerKenzie.svg";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Header = ({products, setFilteredProducts, setSearch}) => {
 
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
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              data.pesquisa
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            ) ||
          element.category
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .includes(
              data.pesquisa
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
            )
      )
    );
    setSearch(data.pesquisa);
  };


  return (
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
    )
}
export default Header