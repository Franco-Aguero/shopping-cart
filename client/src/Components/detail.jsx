import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/ShoppingCart/cartContext";
import { useModal } from "../Hooks/useModal";
import ProductQuantity from "./ProductQuantity";
import ShoppingCart from "./ShoppingCart";
import Divider from "./Views/divider";
import utils from "./utils";
import styled, { css } from "styled-components";
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
    div:first-of-type {
      display: flex;
      flex-direction: column;
    }
  `,
  SizesList = styled.ul`
    display: flex;
    grid-gap: ${({ spacing }) => spacing || ".5rem"};
    margin: 1rem 0;
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
  TextColorAndSizes = styled.span`
    b {
      font-size: 1rem;
      margin-right: 1rem;
    }
  `,
  TechnicalInformation = styled.div`
    display: flex;
    flex-direction: column;
    span {
      margin: 0.5rem 0 1rem;
    }
  `,
  ButtonRadius = styled.button`
    background: ${({ theme }) => theme || "black"};
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 999px;
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: -4px;
      left: -4px;
      width: 100%;
      height: 100%;
      border-radius: 999px;
      border: 2px solid #767676;
      opacity: ${({ active }) => (active ? 1 : 0.3)};
      padding: 2px;
    }
  `,
  SquareButton = styled.button`
    background: ${({ active }) => (active ? "rgb(0, 0, 0)" : "none")};
    color: ${({ active }) => (active ? "white" : "none")};
    border: 1px solid ${({ active }) => (active ? "black" : "#dfdfdf")};
    padding: 4px 12px;
  `;
const Detail = () => {
  const { getProductSpecific, productSpecific } = useContext(CartContext);
  const [isOpenCart, openModalCart, closeModalCart] = useModal(false);
  const { activeStyle } = utils;
  let numT = 0,
    numC = 0;
  const [state, setState] = useState({
    vTalle: 0, //variate de talle
    vColor: 0,
    src: "",
    sku: "",
    name: "",
    price: "",
    stock: "",
    variantes: {
      color: { id: "", name: "", value: "" },
      talla: { id: "", name: "", value: "" },
    },
    ficha_tecnica: [
      { color: "" },
      { marca: "" },
      { talla: "" },
      { otros: "" },
      { "categoria de producto": "" },
    ],
    breadcrumb: [],
  });
  const modifySizeAndColor = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });
  const resetValueState = () => {
    openModalCart();
    setState({ ...state, vTalle: 0, vColor: 0 });
  };
  useEffect(() => {
    getProductSpecific();
  }, []);

  useEffect(() => {
    if (Object.keys(productSpecific).length > 1) {
      let defaultSize =
        productSpecific.product.attributes[0].values[state.vTalle].id;
      let productFound = productSpecific.product.list.find(
        (el) => el.attributes_variants[0].id === defaultSize
      ); //segundo id tengo que cambiar por state local
      setState({
        ...state,
        src: productFound.media[1].src,
        sku: productFound.properties.sku,
        name: productFound.properties.name,
        price: productFound.properties.price,
        stock: productFound.properties.stock,
        variantes: {
          color: {
            id: productFound.attributes_variants[1].id,
            name: productFound.attributes_variants[1].name,
            value: productFound.attributes_variants[1].value,
          },
          talla: {
            id: productFound.attributes_variants[0].id,
            name: productFound.attributes_variants[0].name,
            value: productFound.attributes_variants[0].value,
          },
        },
        ficha_tecnica: [
          { color: productFound.extra_features.color },
          { marca: productFound.extra_features.marca },
          { talla: productFound.extra_features.talla },
          { otros: productFound.extra_features.otros },
          {
            "categoria de producto":
              productFound.extra_features["categoria de producto"],
          },
        ],
        breadcrumb: productSpecific.breadcrumb.map((el) =>
          el.url.toUpperCase()
        ),
      });
      console.log("ENTROSS");
    }
  }, [productSpecific, state.vTalle]);
  console.log(state);

  return Object.keys(productSpecific).length > 1 ? (
    <>
      <CenterArticle>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <UrlText>{state.breadcrumb.join(" /  ")}</UrlText>

          <ContainerDiv className={s.Container}>
            <img src={state.src} alt="product" width={400} />
            <div className={s.Left}>
              <h2>{state.name}</h2>
              <SkuValue>SKU: {state.sku}</SkuValue>
              <h3>S/ {state.price}</h3>
              <Divider />
              <div>
                <TextColorAndSizes>
                  <b>COLOR :</b> {state.variantes.color.value.toUpperCase()}
                </TextColorAndSizes>
                <SizesList spacing="1.5rem">
                  {productSpecific.product.attributes[1].values.map((el) => (
                    <li>
                      <ButtonRadius
                        theme={el.value}
                        active={activeStyle(state.vColor, numC)}
                        name="vColor"
                        value={numC++}
                        onClick={(e) => modifySizeAndColor(e)}
                      />
                    </li>
                  ))}
                  <li>
                    <ButtonRadius
                      theme={"#7d7d83"}
                      active={activeStyle(state.vColor, 99)}
                      name="vColor"
                      value={99}
                      onClick={(e) => modifySizeAndColor(e)}
                    />
                  </li>{" "}
                  {/* example for developers */}
                </SizesList>
                <br />
                <TextColorAndSizes>
                  <b>TALLA :</b> {state.variantes.talla.value}
                </TextColorAndSizes>
                <SizesList spacing="1rem">
                  {productSpecific.product.attributes[0].values.map((el) => (
                    <li key={el.id}>
                      <SquareButton
                        active={activeStyle(state.vTalle, numT)}
                        name="vTalle"
                        value={numT++}
                        onClick={(e) => modifySizeAndColor(e)}
                      >
                        {el.value}
                      </SquareButton>
                    </li>
                  ))}
                </SizesList>
              </div>
              <Divider />
              <ProductQuantity
                viewCart={false}
                stock={state.stock}
                productData={state}
                sku={state.sku}
                handleClic={resetValueState}
              />

              <Divider />
              <TechnicalInformation>
                <span>Ficha Tecnica</span>
                <ul>
                  {state.ficha_tecnica.map((obj) => {
                    return (
                      <li key={Object.keys(obj)[0]}>
                        - {Object.values(obj)[0]}
                      </li>
                    );
                  })}
                </ul>
              </TechnicalInformation>
            </div>
          </ContainerDiv>
        </div>
      </CenterArticle>
      <ShoppingCart isOpen={isOpenCart} closeModal={closeModalCart} />
    </>
  ) : (
    <span>cargando</span>
  );
};
export default Detail;
