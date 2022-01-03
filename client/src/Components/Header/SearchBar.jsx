import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import s from "./SearchBar.module.css";

const SearchBar = () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        alert("Se envio")
    }
    return (
        <form onSubmit={handleSubmit} className={s.Container}>
            <FontAwesomeIcon icon={faSearch} onClick={handleSubmit} id={s.iconSearch} />
            <input type="text" placeholder="BUSCAR" />
        </form>
    )
}
export default SearchBar;