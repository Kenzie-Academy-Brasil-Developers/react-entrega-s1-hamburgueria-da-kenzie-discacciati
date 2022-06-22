import "./styles.css"

const Cart =({currentSale, setCurrentSale})=> {

    const removeProductCart = (product)=>{

        if(product.quantity > 1){
            const index = currentSale.indexOf(product);
            currentSale[index].quantity -= 1;
              setCurrentSale([...currentSale]);
        }
        else{
            setCurrentSale(currentSale.filter((element)=>element.id!== product.id))
        }

        
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
                                    <p className="CategoryProdCart">Qtd= {element.quantity}</p>
                                </div>
                                <button className="BtnRemoveCart" onClick={()=>removeProductCart(element)}>Remover</button>
                            </div>
                        )}
                    </div>
                    <div className="SumCart">
                        <p className="Total">Total</p>
                        <p className="SumPrice">R$ {currentSale.reduce((acc, item)=> (item.price * item.quantity) + acc, 0).toFixed(2).replace(".",",")} </p>
                    </div>
                    <button className="BtnRemoveAllCart" onClick={()=>setCurrentSale([])}>Remover Todos</button> 
                    </>
            }                             
            </div>
        </div>
    );
}

export default Cart; 
