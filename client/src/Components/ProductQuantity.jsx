import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import ButtonBlack from "./Views/buttonBlack";
import s from "./ProductQuantity.module.css"

const ProductQuantity = ({ stock, id, unit, productData, viewCart}) => {
    const { addCart, deleteProductCart} = useContext(CartContext);
    let [productUnit, setProductUnit] = useState(unit || 1);
    const handleChange = (e) =>  e.target.value > 0 && e.target.value <= stock && setProductUnit(productUnit = e.target.value);
    const addCartProductSpecific = () => addCart({...productData,productUnit})//console.log({...productData,productUnit})
    useEffect( () => {
        addCart( {id, productUnit})
        //alert("se esta enviando", productUnit)
    },[productUnit]);
    return (
        <>
            {
            viewCart?
            <div className={s.quantityInCart}>                      {/* for view of shopping cart */}
                <button id={s.BtnLeft} onClick={ () => productUnit > 1 && setProductUnit(--productUnit)}>-</button>          
                <input type="number" name="productUnit" value={productUnit} onChange={(e) => handleChange(e)} min="1"/> 
                <button id={s.BtnRight} onClick={ productUnit < stock ?() => setProductUnit(++productUnit):null}>+</button>
                
                <button id={s.killProduct} onClick={() => deleteProductCart(id)}>Quitar</button>
            </div>
            :   
            <div className={s.quantityInProductSpecif}>              {/* for view of detail product */}
                <input type="number" name="productUnit" value={productUnit} onChange={(e) => handleChange(e)} min="1"/> 
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