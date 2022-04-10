import { useState } from "react"
import "./styles.css"

const Cart =({currentSale, setCurrentSale, cartTotal})=> {
    console.log(currentSale)

/*     const [productCart, setProductCart] = useState ([])

    const productCartOne =()=>{
        setProductCart(currentSale.map()) }*/
    

    const removeProductCart = (id)=>{
        setCurrentSale(currentSale.filter((element)=>element.id!==id))
    }

   
    return(
        <div className="Cart">
            <div className="HeaderCart">
                Carrinho de Compras
            </div>
            <div className="ContainerCart">
                {currentSale.length === 0?
                    <div className="ProductsCart">
                        <p className="TitleCartEmpty">Sua sacola está vazia</p>
                        <p className="DescriptionCartEmpty">Adicione itens</p>
                    </div>
                :   <><div className="ProductsCart">
                        {currentSale.map((element)=> 
                            <div className="ProductCart" key={element.uid}>
                                <div className="DivImgCart">
                                    <img className="ImgCart" src={element.img} alt="" />
                                </div>
                                <div className="InfosCart">
                                    <p className="NameProdCart">{element.name}</p>
                                    <p className="CategoryProdCart">{element.category}</p>
                                </div>
                                <button className="BtnRemoveCart" onClick={()=>removeProductCart(element.id)}>Remover</button>
                            </div>
                        )}
                    </div>
                    <div className="SumCart">
                        <p className="Total">Total</p>
                        <p className="SumPrice">R$ {currentSale.reduce((acc, item)=> item.price + acc, 0).toFixed(2).replace(".",",")} </p>
                    </div>
                    <button className="BtnRemoveAllCart" onClick={()=>setCurrentSale([])}>Remover Todos</button> 
                    </>
            }                             
            </div>
        </div>
    );
}

export default Cart; 