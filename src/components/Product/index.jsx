import "./styles.css"

const Product =({element, handleClick})=>{
    return(
        <div className="CardProduct">
            <div className="ImgProduct">
                <img className="Img" src={element.img} alt=""/>
            </div>
            <div className="InfosProduct">
                <p className="NameProduct">{element.name}</p>
                <p className="CategoryProduct">{element.category}</p>
                <p className="PriceProduct">R$ {element.price.toFixed(2).replace(".",",")}</p>
                <button className="BtnProduct" onClick={()=> {handleClick(element)}}>Adicionar</button>
            </div> 
        </div>    
    )
}
export default Product;
