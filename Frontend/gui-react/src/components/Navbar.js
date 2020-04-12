import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/brand_logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import  styled from 'styled-components';
import {ButtonContainer} from "./Button";
import { ProductConsumer } from "../context";

export default class Navbar extends Component {

        render() {
        return (
           <NavWrapper className="navbar navbar-expand-sm navbar-light pl-sm-5">
               <Link to="/">
                   <img src={logo} alt="Logo" style={{width:80}} className="navbar-brand"/>
               </Link>
               <ul className="navbar-nav align-items-center">
                   <li className="nav-item ml-5">
                       {/* // show a different link depending on weather user is logged in or not */}

                       { this.props.auth ?
                           <Link to="/sell" className="nav-link">
                               Sell Something
                           </Link>
                           :
                           <Link to="/" className="nav-link">
                               Products
                           </Link>

                       }
                   </li>

                       <ProductConsumer>
                           {(value)=>{
                              if (value.myListings.length > 0) {
                                  return (
                                      <li className="nav-item ml-5">
                                      <Link to="/mylistings" className="nav-link">
                                          My Listings
                                      </Link>
                                      </li>
                                  )
                              }
                           }}
                       </ProductConsumer>

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



