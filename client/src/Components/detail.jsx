import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import { useModal } from "../Hooks/useModal";
import ShoppingCart from "./ShoppingCart";
import Divider from "./Views/divider";
import ProductQuantity from "./ProductQuantity";
import utils from "./utils";
import s from "./detail.module.css";

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
        ]
    }); 
    const modifyTalles = (e) => setState({...state,vTalle:e.target.value})
    useEffect( () => {
        getProductSpecific()
    },[])  

    useEffect( () => {
        if(Object.keys(productSpecific).length > 1){
            let defaultTalla = productSpecific.product.attributes[0].values[state.vTalle].id;
            let encontrador = productSpecific.product.list.find( el => el.attributes_variants[0].id === defaultTalla) //segundo id tengo que cambiar por state local
            setState({ 
                ...state,
                src: encontrador.media[1].src,
                sku: encontrador.properties.sku ,
                name: encontrador.properties.name ,
                price: encontrador.properties.price,
                stock: encontrador.properties.stock,
                variantes:{
                    color: {
                        id: encontrador.attributes_variants[1].id,
                        name: encontrador.attributes_variants[1].name,
                        value: encontrador.attributes_variants[1].value,
                    },
                    talla: {
                        id: encontrador.attributes_variants[0].id,
                        name: encontrador.attributes_variants[0].name,
                        value: encontrador.attributes_variants[0].value,
                    }
                },  
                ficha_tecnica: [
                    { color: encontrador.extra_features.color },
                    { marca: encontrador.extra_features.marca },
                    { talla: encontrador.extra_features.talla },
                    { otros: encontrador.extra_features.otros },
                    { "categoria de producto": encontrador.extra_features["categoria de producto"] }
                ]
            });
            console.log("ENTROSS")
        }
    },[productSpecific, state.vTalle])  
        
    const [isOpenCart, openModalCart, closeModalCart] = useModal(false);
    
    return (
    
            
            Object.keys(productSpecific).length > 1 ?
                <>
                   <div className={s.Container}>
                       <img src={state.src} alt="product" width={400}/>
                       <div className={s.Left}>
                            <h2>{state.name}</h2>
                            <span>SKU: {state.sku}</span>
                            <span><b>S/ { state.price}</b></span>
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
                                <ul style={{listStyle:"none", display:"flex", padding: "0", gridGap:".5rem"}}>
                                {
                                    productSpecific.product.attributes[0].values.map( el => 
                                        <li key={el.id}>
                                            <button type={numT} className={activeStyle(state.vTalle, numT)} value={numT++} onClick={(e) => modifyTalles(e)}>{el.value}</button>
                                        </li> 
                                    )
                                }
                                </ul>
                            </div>
                            <Divider/>
                            <ProductQuantity viewCart={false} stock={state.stock} productData={state} sku={state.sku} handleClic={openModalCart}/>
                            
                            <Divider/>
                            <div>
                                <span>Ficha Tecnica</span>
                                <ul style={{listStyle:"none", padding:"0"}}>
                                    <li>- Short super suave y fresco</li>
                                    <li>- Pititas ajustables</li>
                                    <li>- Bolsillo laterales</li>
                                </ul>
                            </div>
                       </div>
                   </div>
                    <ShoppingCart isOpen={isOpenCart} closeModal={closeModalCart}/>
                </>
                : <span>cargando</span>
            
    )
}
export default Detail;