import React, { useContext } from "react";
import Modal from "./Modal";
import CartContext from "../Context/ShoppingCart/cartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ProductQuantity from "./ProductQuantity";
import utils from "./utils"
import ButtonBlack from "./Views/buttonBlack";
import s from"./ShoppingCart.module.css"
import Divider from "./Views/divider";

const ShoppingCart = ({isOpen, closeModal}) => {
    const { shoppingCart } = useContext(CartContext);
    const { totalPriceCart } = utils;
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <div className={s.container}>     
                <header>
                    <h3>CARRO DE COMPRAS ({shoppingCart.length})</h3>
                    <button onClick={closeModal}><FontAwesomeIcon icon={faTimes} id={s.iconClosed} /></button>
                </header>
                <Divider/>
                {
                    shoppingCart.length > 0 ?
                    <>
                        <ul className={s.ProductList}>
                            {
                                shoppingCart.map( el => 
                                    <li key={el.sku}>
                                        <img src={el.src} alt="product" />
                                        <div className={s.Information}>
                                            <span><b>{el.name}</b></span>
                                            <p>
                                                <b>TALLA</b> {el.variantes.talla.value} <br />
                                                <b>COLOR</b> {el.variantes.color.value}
                                            </p>
                                            <span><b>S/ {el.price}</b></span>   
                                            <ProductQuantity viewCart={true} stock={el.stock} unit={el.unit} sku={el.sku}/>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                        <Divider/>
                        <footer>
                            <p>SUBTOTAL  <span>S/ {totalPriceCart(shoppingCart)}</span></p>
                            <ButtonBlack>
                                <span style={{padding:"1rem 0", fontWeight:"600"}}>IR AL CARRITO</span>
                            </ButtonBlack> 
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