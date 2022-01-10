import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import ButtonBlack from "./Views/buttonBlack";
//import s from "./ProductQuantity.module.css"
import styled from "styled-components";

const QuantityInCartDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    button:nth-child(1),
    button:nth-child(3) {
      background-color: rgb(231 229 229 / 73%);
      width: 1.5rem;
      height: 1.5rem;
      border: none;
      outline: none;
      cursor: pointer;
    }
    input:first-of-type {
      background: none;
      width: 1.5rem;
      height: auto;
      text-align: center;
      outline: none;
      border: none;
    }
    button:last-of-type {
      border: none;
      outline: none;
      background: none;
      position: absolute;
      right: 0;
      cursor: pointer;
    }
  `,
  QuantityInProductSpecifDiv = styled.div`
    display: flex;
    width: max-content;
    margin: 0.5rem 0;
    div:first-of-type {
      display: flex;
      flex-direction: column;
      margin-right: 1.5rem;
    }
    button:nth-child(1),
    button:nth-child(2) {
      cursor: pointer;
      border: none;
      padding: 2px 8px;
      font-size: 20px;
    }
    input:first-of-type {
      background: none;
      width: 1.5rem;
      height: auto;
      text-align: center;
      outline: none;
      padding: 1rem;
      border: 1px solid rgb(231 229 229 / 73%);
    }
    button {
      font-size: 11px;
      outline: none;
    }
  `,
  TextSpan = styled.span`
    padding: 0 7rem;
    font-weight: 600;
  `;
const ProductQuantity = ({
  stock,
  sku,
  unit,
  productData,
  viewCart,
  handleClic,
}) => {
  const { addCart, deleteProductCart } = useContext(CartContext);
  let [productUnit, setProductUnit] = useState(unit || 1);
  const handleChange = (e) =>
    e.target.value > 0 &&
    e.target.value <= stock &&
    setProductUnit((productUnit = e.target.value));
  const addCartProductSpecific = async () => {
    await addCart({ ...productData, unit: productUnit });
    setProductUnit(1);
    handleClic();
  };
  useEffect(() => {
    if (viewCart) {
      addCart({ sku, unit: productUnit });
      console.log("EN ALGUN MONETNO SAE ENVIO", viewCart);
    }
  }, [productUnit]);
  useEffect(() => {
    if (!viewCart) return setProductUnit(1); //esta verificacion es por si cambian de talle, que la unidad se resetee en el component detail
  }, [productData?.sku]);
  console.log(viewCart);
  return (
    <>
      {viewCart ? (
        <QuantityInCartDiv>
          {" "}
          {/* for view of shopping cart */}
          <button
            onClick={() => productUnit > 1 && setProductUnit(--productUnit)}
          >
            -
          </button>
          <input
            type="number"
            name="productUnit"
            value={productUnit}
            onChange={(e) => handleChange(e)}
            min="1"
          />
          <button
            onClick={
              productUnit < stock ? () => setProductUnit(++productUnit) : null
            }
          >
            +
          </button>
          <button onClick={() => deleteProductCart(sku)}>
            <u>Quitar</u>
          </button>
        </QuantityInCartDiv>
      ) : (
        <QuantityInProductSpecifDiv>
          {" "}
          {/* for view of detail product */}
          <input
            type="number"
            name="productUnit"
            value={productUnit}
            onChange={(e) => handleChange(e)}
            min="1"
          />
          <div>
            <button
              onClick={
                productUnit < stock ? () => setProductUnit(++productUnit) : null
              }
            >
              +
            </button>
            <button
              onClick={() => productUnit > 1 && setProductUnit(--productUnit)}
            >
              -
            </button>
          </div>
          <ButtonBlack handleClic={addCartProductSpecific}>
            <TextSpan>AÑADIR AL CARRITO</TextSpan>
          </ButtonBlack>
        </QuantityInProductSpecifDiv>
      )}
    </>
  );
};
export default ProductQuantity;
// prop ProductData, recibe la informacion del producto seleccionado para luego juntarlo con la unidad y cargarlo en el carrito
// prop viewCart, es para saber cual button debe retornar
