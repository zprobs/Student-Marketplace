import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/brand_logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
    export default class Navbar extends Component {
    render() {
        return (
           <nav className="navbar navbar-expand-sm bg-dark navbar-dark px-sm-5">
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
                   <button>
                       <FontAwesomeIcon icon={faCartPlus} />

                   </button>
               </Link>
           </nav>
        )
    }
}