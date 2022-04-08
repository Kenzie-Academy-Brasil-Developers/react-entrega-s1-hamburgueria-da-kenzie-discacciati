import "./styles.css"
import Product from "../Product"

const ProductsList =({products, handleClick})=>{
   
    return(
        <div className="containerProducts">
            {products.map((element)=>
                <Product element={element} key={element.id} handleClick={handleClick}/>
            )}
        </div>

    );
}

export default ProductsList