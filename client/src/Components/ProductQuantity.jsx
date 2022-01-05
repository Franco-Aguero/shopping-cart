import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import ButtonBlack from "./Views/buttonBlack";
import s from "./ProductQuantity.module.css"

const ProductQuantity = ({ stock, sku, unit, productData, viewCart, handleClic}) => {
    const { addCart, deleteProductCart} = useContext(CartContext);
    let [productUnit, setProductUnit] = useState(unit || 1);
    const handleChange = (e) =>  e.target.value > 0 && e.target.value <= stock && setProductUnit(productUnit = e.target.value);
    const addCartProductSpecific = async () => {
        await addCart({...productData, unit: productUnit}); 
        setProductUnit(1);
        handleClic();
    }    
    useEffect( () => {
        if (viewCart){
            addCart( {sku, unit: productUnit})
            console.log("EN ALGUN MONETNO SAE ENVIO", viewCart)
        }
        //alert("se esta enviando", productUnit)
    },[productUnit]);
    useEffect( () => {
        if(!viewCart)return setProductUnit(1);//esta verificacion es por si cambian de talle, que la unidad se resetee en el component detail
    },[productData?.sku]);
    console.log(viewCart)
    return (
        <>
            {
            viewCart?
            <div className={s.quantityInCart}>                      {/* for view of shopping cart */}
                <button id={s.BtnLeft} onClick={ () => productUnit > 1 && setProductUnit(--productUnit)}>-</button>          
                <input type="number" className={s.InputNumber} name="productUnit" value={productUnit} onChange={(e) => handleChange(e)} min="1"/> 
                <button id={s.BtnRight} onClick={ productUnit < stock ?() => setProductUnit(++productUnit):null}>+</button>
                
                <button id={s.killProduct} onClick={() => deleteProductCart(sku)}>Quitar</button>
            </div>
            :   
            <div className={s.quantityInProductSpecif}>              {/* for view of detail product */}
                <input type="number" className={s.InputNumber} name="productUnit" value={productUnit} onChange={(e) => handleChange(e)} min="1"/> 
                <div>
                    <button id={s.BtnDecrement} onClick={ () => productUnit > 1 && setProductUnit(--productUnit)}>-</button>          
                    <button id={s.BtnIncrement} onClick={ productUnit < stock ?() => setProductUnit(++productUnit):null}>+</button>
                </div>
                <ButtonBlack handleClic={addCartProductSpecific}>
                    <span style={{padding:"0 7rem", fontWeight:"600"}}>AÑADIR AL CARRITO</span>
                </ButtonBlack>
            </div>
            }
        </>
    )
}
export default ProductQuantity;

// prop ProductData, recibe la informacion del producto seleccionado para luego juntarlo con la unidad y cargarlo en el carrito
// prop viewCart, es para saber cual button debe retornar