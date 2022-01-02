import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import s from "./ProductQuantity.module.css"

const ProductQuantity = ({ stock, id, unit }) => {
    const { addCart, deleteProductCart} = useContext(CartContext);
    let [productUnit, setProductUnit] = useState(unit);
    const handleChange = (e) =>  e.target.value > 0 && e.target.value <= stock && setProductUnit(productUnit = e.target.value);
    useEffect( () => {
        addCart( {id, productUnit})
        //alert("se esta enviando", productUnit)
    },[productUnit]);
    return (
        <div className={s.quantity}>
            <button id={s.BtnLeft} onClick={ () => productUnit > 1 && setProductUnit(--productUnit)}>-</button>          
            <input type="number" name="productUnit" value={productUnit} onChange={(e) => handleChange(e)} min="1"/> 
            <button id={s.BtnRight} onClick={ productUnit < stock ?() => setProductUnit(++productUnit):null}>+</button>
            
            <button id={s.killProduct} onClick={() => deleteProductCart(id)}>Quitar</button>
        </div>   
    )
}
export default ProductQuantity;