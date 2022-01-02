import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../Context/ShoppingCart/cartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ProductQuantity from "./ProductQuantity";
import utils from "./utils"
import s from"./ShoppingCart.module.css"

const ShoppingCart = ({isOpen, closeModal}) => {
    let img="https://maui-prod-sail.s3-us-west-2.amazonaws.com/media/cache/fb/fa/fbfa8c8b22068634308a33ee585e0c53.jpg";//provisorio
    const { productSpecific } = useContext(CartContext);
    let storeOfCart = [productSpecific];
    const { totalPriceCart } = utils;
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <div className={s.container}>     
                <header>
                    <h3>CARRO DE COMPRAS (1)</h3>
                    <button onClick={closeModal}><FontAwesomeIcon icon={faTimes} id={s.iconClosed} /></button>
                </header>
                {
                    storeOfCart.length > 0 ?
                    <>
                        <ul>
                            {
                                storeOfCart.map( el => 
                                    <li>
                                        <img src={img} alt="product" />
                                        <div>
                                            <span><b>SHORT JERSEY C50008</b></span>
                                            <p>
                                                <b>TALLA</b> MEDIUM <br />
                                                <b>COLOR</b> MELANGE
                                            </p>
                                            <span><b>S/ 75.00</b></span>   
                                            <ProductQuantity stock={el.stock || 15} unit={el.unit || 4}/>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                        <footer>
                            <p>SUBTOTAL  <span>{totalPriceCart(storeOfCart) || "S/ 75.00"}</span></p>
                            <button>IR AL CARRITO</button>
                        </footer>
                    </>
                    :
                    <span> No hay Prodcutos</span>
                }
            </div>
        </Modal>
    )
}
export default ShoppingCart;