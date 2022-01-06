import React, { useContext } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Modal from "./Modal";
import ProductQuantity from "./ProductQuantity";
import ButtonBlack from "./Views/buttonBlack";
import Divider from "./Views/divider";
import utils from "./utils"
import styled from "styled-components";
//import s from"./ShoppingCart.module.css"

const ContainerDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    min-width: 400px;
    height: 100vh; 
    header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem 0;
    };
    header button{
        outline: none;
        border: none;
        background: none;
        cursor: pointer;
    };
    ul{
        background: none;
        height: inherit;
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        grid-row-gap: 1.5rem;
        overflow-y: auto;
        ::-webkit-scrollbar {
            width: .4rem;
        }
        ::-webkit-scrollbar-track{
            background: none;
        }
        ::-webkit-scrollbar-thumb{
            background: rgb(173 173 173 / 73%);
            border-radius: 6px;
        }
    };
    li{
        display: flex;
        grid-gap: 1rem;
        height: max-content;
    };
`,
RightDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    p{
        display: flex;
        flex-direction: column;
        margin: .5rem 0;
        b{
            font-size: 14px;
        }
    }
`,
PriceProductList = styled.span`
    margin: .5rem 0;
`,
FontAwesomeIconClosed = styled(FontAwesomeIcon)`
    font-size: 20px;
`,
Footer = styled.footer`
    display: flex;
    flex-direction: column;
    padding: 0rem 2rem 1.5rem;
    p{
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        margin-top: 0;
    }
`,
TextSpan = styled.span`
    padding: 1rem 0;
    font-weight: 600;
`,
DefaultContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 2rem;
    padding-top: 6rem;
    height: 100%;
    h3{
        margin-bottom: 1rem;
    }
`,
FontAwesomeIconCart = styled(FontAwesomeIcon)`
    font-size: 10rem;
    color: black;
    opacity: 0.5;  
    margin-bottom: 1rem;  
`,
FontAwesomeIconCross = styled(FontAwesomeIcon)`
    position: absolute;
    top: 7.5rem;
    left: 49%;
    font-size: 4rem;
    color: white;
`,
TextButton = styled.span`
    padding: 1rem 3rem;
    font-size: 14px;
    font-weight: 500;
`;
const ShoppingCart = ({isOpen, closeModal}) => {
    const { shoppingCart } = useContext(CartContext);
    const { totalPriceCart } = utils;
    return (
        <Modal isOpen={isOpen} closeModal={closeModal}>
            <ContainerDiv>     
                <header>
                    <h3>CARRO DE COMPRAS ({shoppingCart.length})</h3>
                    <button onClick={closeModal}><FontAwesomeIconClosed icon={faTimes}/></button>
                </header>
                <Divider/>
                {
                    shoppingCart.length > 0 ?
                    <>
                        <ul>
                            {
                                shoppingCart.map( el => 
                                    <li key={el.sku}>
                                        <img src={el.src} alt="product" width="100" height="125" />
                                        <RightDiv>
                                            <span><b>{el.name}</b></span>
                                            <p>
                                                <span><b>TALLA</b> {el.variantes.talla.value}</span> 
                                                <span><b>COLOR</b> {el.variantes.color.value}</span>
                                            </p>
                                            <PriceProductList><b>S/ {el.price}</b></PriceProductList>   
                                            <ProductQuantity viewCart={true} stock={el.stock} unit={el.unit} sku={el.sku}/>
                                        </RightDiv>
                                    </li>
                                )
                            }
                        </ul>
                        <Divider/>
                        <Footer>
                            <p>SUBTOTAL  <span>S/ {totalPriceCart(shoppingCart)}</span></p>
                            <ButtonBlack>
                                <TextSpan>IR AL CARRITO</TextSpan>
                            </ButtonBlack> 
                        </Footer>
                    </>
                    :
                    <DefaultContainer> 
                        <FontAwesomeIconCart icon={faShoppingCart} />
                        <FontAwesomeIconCross icon={faTimes} />
                        <h3>No hay productos en el carrito.</h3>
                        <ButtonBlack handleClic={closeModal}><TextButton>Regresar atras</TextButton></ButtonBlack>
                    </DefaultContainer>
                }
            </ContainerDiv>
        </Modal>
    )
}
export default ShoppingCart;