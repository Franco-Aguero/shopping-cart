import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
//import s from "./SearchBar.module.css";

const FormSerchBar = styled.form`
    display: flex;
    align-items: center;
    background-color: none;
    color: white;
    height: 2rem;
`,
InputSearch = styled.input`
    width: 5rem;
    color: white;
    background: none;
    border: none;
    outline: none;
    ::placeholder {
        color: white;
    }
`,
FontAwesomeIconSearch = styled(FontAwesomeIcon)`
    font-size: 20px;
    margin-right: 1rem;
`;
const SearchBar = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Se envio")
    }
    return (
        <FormSerchBar onSubmit={handleSubmit} >
            <FontAwesomeIconSearch icon={faSearch} onClick={handleSubmit}/>
            <InputSearch type="text" placeholder="BUSCAR" />
        </FormSerchBar>
    )
}
export default SearchBar;