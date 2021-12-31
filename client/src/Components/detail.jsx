import React, { useContext, useEffect } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import { useModal } from "../Hooks/useModal"
import Modal from "./Modal";
import ShoppingCart from "./ShoppingCart";

const Detail = () => {
    let dataProduct=true;
    //let { sku, name} = dataProduct?.detail_product.product.list[2];
    const { getProductSpecific, productSpecific} = useContext(CartContext)
    useEffect( async() => {
        getProductSpecific()
        /* console.log(data.detail_product.product.list[2]) */
    },[])  
    console.log("second", productSpecific)

    /* const [isOpenModal1, openModal1, closeModal1] = useModal(false); */
    const [isOpenCart, openModalCart, closeModalCart] = useModal(true);
    
    return (
        <div>
            {
                dataProduct?
                <>
                    <span>/</span>
                    <span>/</span>
                    {/* <Modal isOpen={isOpenModal1} closeModal={closeModal1}>
                        <h5>SOY MODAL MATIIIII</h5>
                    </Modal> */}
                    <ShoppingCart isOpen={isOpenCart} closeModal={closeModalCart}/>
                </>
                : <span>cargando</span>
            }
        </div>
    )
}
export default Detail;