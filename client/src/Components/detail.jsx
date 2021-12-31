import React, { useContext, useEffect } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import axios from "axios";


const Detail = () => {
    let dataProduct=true;
    //let { sku, name} = dataProduct?.detail_product.product.list[2];
    const { getProductSpecific, productSpecific} = useContext(CartContext)
    useEffect( async() => {
        getProductSpecific()
        /* console.log(data.detail_product.product.list[2]) */
    },[])  
    console.log("second", productSpecific)
    return (
        <div>
            {
                dataProduct?
                <>
                    <span>/</span>
                    <span>/</span>
                </>
                : <span>cargando</span>
            }
        </div>
    )
}
export default Detail;