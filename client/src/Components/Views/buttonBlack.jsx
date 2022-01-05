import React from "react";
import styled from "styled-components";

const ButtonColorBlack = styled.button`
    border:none; 
    outline:none;
    color:white;
    font-size:11px;
    cursor:pointer; 
    background:black;
    padding: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const ButtonBlack = ({ children, handleClic, value}) => {
    return(
        <ButtonColorBlack value={value} onClick={(e) => handleClic(e)}>
            {children}
        </ButtonColorBlack>
    )
}
export default ButtonBlack;