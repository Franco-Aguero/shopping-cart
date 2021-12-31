import React, { useState } from "react";
import s from "./ProductQuantity.module.css"
const ProductQuantity = ({ stock, id, children}) => {
    let [productUnit, setProductUnit] = useState(1);
    const handleChange = (e) =>  e.target.value > 0 && setProductUnit(productUnit = e.target.value);
    return (
        <div className={s.quantity}>
            <button id={s.BtnLeft} onClick={ () => productUnit > 1 && setProductUnit(--productUnit)}>-</button>          
            <input type="number" name="productUnit" value={productUnit} onChange={(e) => handleChange(e)} min="1"/> 
            <button id={s.BtnRight} onClick={ () => setProductUnit(++productUnit)}>+</button>
            
            <button id={s.killProduct}>Quitar</button>
        </div>   
    )
}
export default ProductQuantity;