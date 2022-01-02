import React, { useContext, useEffect } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import { useModal } from "../Hooks/useModal"
import ShoppingCart from "./ShoppingCart";
import Divider from "./Views/divider";
import ProductQuantity from "./ProductQuantity";
import s from "./detail.module.css";

const Detail = () => {
    let dataProduct=true;
    //let { sku, name} = dataProduct?.detail_product.product.list[2];
    const { getProductSpecific, productSpecific} = useContext(CartContext)
    useEffect( async() => {
        getProductSpecific()
        /* console.log(data.detail_product.product.list[2]) */
    },[])  
    console.log("second", productSpecific)
    let img="https://maui-prod-sail.s3-us-west-2.amazonaws.com/media/cache/fb/fa/fbfa8c8b22068634308a33ee585e0c53.jpg";//provisorio
    const [isOpenCart, openModalCart, closeModalCart] = useModal(true);
    
    return (
        <div>
            {
                dataProduct?
                <>
                   <div className={s.Container}>
                       <img src={img} alt="product" width={300}/>
                       <div className={s.Left}>
                            <h2>SHORT JERSEY C50008</h2>
                            <span>SKU: {"601C50008ME0M"}</span>
                            <span><b>S/ 75.00</b></span>
                            <Divider/>
                            <p>
                                <b>COLOR</b> MELANGE
                                <br />
                                <input type="radio" name="" id="" />
                                <input type="radio" name="" id="" />
                                <input type="radio" name="" id="" />
                                <br />
                                <b>TALLA</b> MEDIUM 
                                <br />
                                <input type="radio" name="" id="" />
                                <input type="radio" name="" id="" />
                                <input type="radio" name="" id="" />

                            </p>
                            <Divider/>
                            <ProductQuantity stock={15} productData={productSpecific}/>
                            
                            <Divider/>
                            <p>
                                <span>Ficha Tecnica</span>
                                <ul style={{listStyle:"none", padding:"0"}}>
                                    <li>- Short super suave y fresco</li>
                                    <li>- Pititas ajustables</li>
                                    <li>- Bolsillo laterales</li>
                                </ul>
                            </p>
                       </div>
                   </div>
                    <ShoppingCart isOpen={isOpenCart} closeModal={closeModalCart}/>
                </>
                : <span>cargando</span>
            }
        </div>
    )
}
export default Detail;