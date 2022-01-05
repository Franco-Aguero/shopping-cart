import React from "react";
import styled from "styled-components";

const DividerDiv = styled.div`
    width:100%;
    height: 2px;
    margin: 1rem 0;
    background-color: rgb(228 228 231);
`;
const Divider = () => {
    return (
        <DividerDiv />
    )
}
export default Divider;