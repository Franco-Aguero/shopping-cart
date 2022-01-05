import { GET_PRODUCT_SPECIFIC, ADD_CART, DELETE_PRODUCT_CART } from "../types";

function cartReducer(state, action) {
    const {type, payload} = action;

    switch(type) {
        case GET_PRODUCT_SPECIFIC:
            return {...state, productSpecific: payload}
        case ADD_CART:
            return {
                ...state, 
                shoppingCart: state.shoppingCart.find( el => el.sku === payload.sku )?
                state.shoppingCart.map( el => {
                    if(el.sku === payload.sku) return {...el, unit:payload.unit}
                    else return el
                })
                : [...state.shoppingCart, payload]
            }
        case DELETE_PRODUCT_CART:
            return {...state, shoppingCart: state.shoppingCart.filter( el => el.sku !== payload)}
        default:
            return state
    }
}
export default cartReducer;