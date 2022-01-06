import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import { useModal } from "../Hooks/useModal";
import ProductQuantity from "./ProductQuantity";
import ShoppingCart from "./ShoppingCart";
import Divider from "./Views/divider";
import utils from "./utils";
import styled, {css} from "styled-components";
import s from "./detail.css";

const CenterArticle = styled.article`
    min-height: 86vh;
    display: flex;
    justify-content: center;
    align-items: center;
`,
ContainerDiv = styled.div`
    display: flex;
    grid-gap: 4rem;
    margin: auto;
    div:first-of-type{
        display: flex;
        flex-direction: column;
    }
`,
SizesList = styled.ul`
    display: flex;
    grid-gap: .5rem;
`,
UrlText = styled.h5`
    font-weight: 500;
    color: #b9b9b9;
    margin-top: 0;
`,
SkuValue = styled.span`
    margin: 1rem 0;
    font-weight: 500;
    font-size: 12px;
`,
TechnicalInformation = styled.div`
    display: flex;
    flex-direction: column;
    span{
        margin: .5rem 0 1rem;
    }
`;
const Detail = () => {
    const { getProductSpecific, productSpecific} = useContext(CartContext);
    const { activeStyle } = utils;
    let numT = 0, numC = 0;
    const [state, setState] = useState({
        vTalle: 0, //variate de talle
        vColor:0,
        src: "",
        sku: "",
        name: "",
        price: "",
        stock: "",
        variantes:{
            color: { id: "", name:"", value: "", },
            talla: { id: "", name: "", value: "", }
        }, 
        ficha_tecnica: [
            { color: "" },
            { marca: "" },
            { talla: "" },
            { otros: "" },
            { "categoria de producto": "" }
        ],
        breadcrumb: [],
    }); 
    const modifyTalles = (e) => setState({...state,vTalle:e.target.value})
    useEffect( () => {
        getProductSpecific()
    },[])  

    useEffect( () => {
        if(Object.keys(productSpecific).length > 1){
            let defaultSize = productSpecific.product.attributes[0].values[state.vTalle].id;
            let productFound = productSpecific.product.list.find( el => el.attributes_variants[0].id === defaultSize) //segundo id tengo que cambiar por state local
            setState({ 
                ...state,
                src: productFound.media[1].src,
                sku: productFound.properties.sku ,
                name: productFound.properties.name ,
                price: productFound.properties.price,
                stock: productFound.properties.stock,
                variantes:{
                    color: {
                        id: productFound.attributes_variants[1].id,
                        name: productFound.attributes_variants[1].name,
                        value: productFound.attributes_variants[1].value,
                    },
                    talla: {
                        id: productFound.attributes_variants[0].id,
                        name: productFound.attributes_variants[0].name,
                        value: productFound.attributes_variants[0].value,
                    }
                },  
                ficha_tecnica: [
                    { color: productFound.extra_features.color },
                    { marca: productFound.extra_features.marca },
                    { talla: productFound.extra_features.talla },
                    { otros: productFound.extra_features.otros },
                    { "categoria de producto": productFound.extra_features["categoria de producto"] }
                ],
                breadcrumb: productSpecific.breadcrumb.map( el => el.url.toUpperCase() ), 
            });
            console.log("ENTROSS")
        }
    },[productSpecific, state.vTalle])  
    console.log(state)
    const [isOpenCart, openModalCart, closeModalCart] = useModal(false);
    
    return (
    
            
            Object.keys(productSpecific).length > 1 ?
                <>
                <CenterArticle>
                <div style={{display:"flex", flexDirection:"column"}}>

                    <UrlText>{state.breadcrumb.join(" /  ")}</UrlText>
                    
                   <ContainerDiv className={s.Container}>
                       <img src={state.src} alt="product" width={400}/>
                       <div className={s.Left}>
                            <h2>{state.name}</h2>
                            <SkuValue>SKU: {state.sku}</SkuValue>
                            <h3>S/ { state.price}</h3>
                            <Divider/>
                            <div>
                                <b>COLOR</b> {state.variantes.color.value}
                                <br />
                                <input type="radio" name="" id="" />
                                <input type="radio" name="" id="" />
                                <input type="radio" name="" id="" />
                                    <br />
                                <b>TALLA</b> {state.variantes.talla.value} 
                                    <br />
                                <SizesList className="ContainetButtons">
                                {
                                    productSpecific.product.attributes[0].values.map( el => 
                                        <li key={el.id}>
                                            <button className={activeStyle(state.vTalle,numT)} value={numT++} onClick={(e) => modifyTalles(e)}>{el.value}</button>
                                        </li> 
                                    )
                                }
                                </SizesList>
                            </div>
                            <Divider/>
                            <ProductQuantity viewCart={false} stock={state.stock} productData={state} sku={state.sku} handleClic={openModalCart}/>
                            
                            <Divider/>
                            <TechnicalInformation>
                                <span>Ficha Tecnica</span>
                                <ul>
                                    {
                                        state.ficha_tecnica.map( obj => {
                                            return <li key={Object.keys(obj)[0]}>- {Object.values(obj)[0]}</li>
                                        })
                                    }
                                </ul>
                            </TechnicalInformation>
                       </div>
                   </ContainerDiv>
            </div>
                </CenterArticle>
                    <ShoppingCart isOpen={isOpenCart} closeModal={closeModalCart}/>
                </>
                : <span>cargando</span>
            
    )
}
export default Detail;