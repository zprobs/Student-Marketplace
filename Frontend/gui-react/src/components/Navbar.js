import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/brand_logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import  styled from 'styled-components';
import {ButtonContainer} from "./Button";

export default class Navbar extends Component {
    render() {
        return (
           <NavWrapper className="navbar navbar-expand-sm navbar-light pl-sm-5">
               <Link to="/">
                   <img src={logo} alt="Logo" style={{width:80}} className="navbar-brand"/>
               </Link>
               <ul className="navbar-nav align-items-center">
                   <li className="nav-item ml-5">
                       <Link to="/" className="nav-link">
                           Products
                       </Link>
                   </li>
               </ul>
               <Link to='/cart' className="ml-auto">
                   <ButtonContainer>
                       <span className="mr-2">
                        <FontAwesomeIcon icon={faCartPlus} />
                       </span>
                        My Cart
                   </ButtonContainer>
               </Link>
               <Link to='/login' className="ml-2">
                   <FontAwesomeIcon icon={faPortrait} className="fa-3x"/>
               </Link>
           </NavWrapper>
        );
    }
}
    const NavWrapper = styled.nav`
        background: var(--lightWhite);
        .nav-link {
            color: var(--lightBlue)!important;
            font-size: 1.3rem;
            text-transform: capitalize;
         }
    `;
