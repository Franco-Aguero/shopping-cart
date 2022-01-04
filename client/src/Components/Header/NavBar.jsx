import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import s from "./NavBar.module.css";

const NavBar = () => {
    let list = ["MUJER","HOMBRE", "COLECCIONES", "PROMOCIONES", "NAVIDAD"], numberKey = 0;
    
    return (
        <header className={s.Container}>
            <div>
                <SearchBar/>
                <h1 style={{fontWeight: "500", fontSize: "30px"}}>JOCKEY</h1>
                <span><FontAwesomeIcon icon={faUserAlt} id={s.iconUser} />INGRESAR</span> 
            </div>
            <nav>
                <ul className={s.ListPage}>
                    {
                        list.map( el => 
                            <li key={numberKey++}>
                                <Link to={`#${el}`}>{el}</Link> 
                            </li>
                        )
                    }
                </ul>
            </nav>       
        </header>
    )
}
export default NavBar;