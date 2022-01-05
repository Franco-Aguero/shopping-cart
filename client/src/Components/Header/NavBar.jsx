import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import SearchBar from "./SearchBar";
import styled from "styled-components";
//import s from "./NavBar.module.css";

const Header = styled.header`
    display: flex;
    flex-direction: column;
    background-color: #101a27;
    color: white;
    padding: 1rem 2rem;
    font-family: 'Questrial', sans-serif;
`,
FirstDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 1rem;
`,
ListNav = styled.ul`
display:flex; justify-content:center;
`,
ListNavLink = styled(Link)`
    padding: .5rem 2rem;
    color: white;
    text-decoration: none;
`,
FontAwesomeIconStyled = styled(FontAwesomeIcon)`
margin-right: 1rem; 
`,
TitleH1 = styled.h1`
    font-weight: 500; 
    font-size: 30px;
`;
const NavBar = () => {
    let list = ["MUJER","HOMBRE", "COLECCIONES", "PROMOCIONES", "NAVIDAD"], numberKey = 0;
    
    return (
        <Header /* className={s.Container} */>
            <FirstDiv>
                <SearchBar/>
                <TitleH1>JOCKEY</TitleH1>
                <span><FontAwesomeIconStyled icon={faUserAlt}/>INGRESAR</span> 
            </FirstDiv>
            <nav>
                <ListNav /* className={s.ListPage} */>
                    {
                        list.map( el => 
                            <li key={numberKey++}>
                                <ListNavLink to={`#${el}`}>{el}</ListNavLink> 
                            </li>
                        )
                    }
                </ListNav>
            </nav>       
        </Header>
    )
}
export default NavBar;