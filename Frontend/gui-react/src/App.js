import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import {Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import Cart from "./components/Cart";
import Details from "./components/Details";

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar/>
                <Switch>
                    <Route exact path="/" component={ProductList}/>
                    <Route path="/details" component={Details}/>
                    <Route path="/cart" component={Cart}/>
                    <Route component={Default}/>
                </Switch>
            </React.Fragment>


        );
    }
}

export default App;
