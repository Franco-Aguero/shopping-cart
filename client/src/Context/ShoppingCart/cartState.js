import React, { useReducer } from "react";
import axios from "axios";
import CartReducer from "./cartReducer";
import CartContext from "./cartContext";
import utils from "../../Components/utils";
import { GET_PRODUCT_SPECIFIC, ADD_CART, DELETE_PRODUCT_CART } from "../types";
const url =
  "https://api.mauiandsons.com.pe/api/v1/products/products-json/bermuda-6b660-m-3/";

const CartState = (props) => {
  let { bringSomeLocalStorage } = utils,
    localStorage = bringSomeLocalStorage("cart");
  const initialState = {
    productSpecific: {},
    shoppingCart: localStorage?.length > 0 ? localStorage : [],
  };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const getProductSpecific = async () => {
    try {
      let { data } = await axios.get(url);
      dispatch({ type: GET_PRODUCT_SPECIFIC, payload: data.detail_product });
    } catch (err) {
      alert(err);
    }
  };
  const addCart = (product) => {
    dispatch({ type: ADD_CART, payload: product });
  };
  const deleteProductCart = (id) => {
    dispatch({ type: DELETE_PRODUCT_CART, payload: id });
  };

  return (
    <CartContext.Provider
      value={{
        productSpecific: state.productSpecific,
        shoppingCart: state.shoppingCart,
        getProductSpecific,
        addCart,
        deleteProductCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartState;
