import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import {Switch, Route} from 'react-router-dom';
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Default from "./components/Default";
import Cart from "./components/Cart/Cart";
import Details from "./components/Details";
import Modal from "./components/Modal";
import Chat from "./components/Chat";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login"
import Confirmation from "./components/Confirmation";
import Sell from "./components/Sell";
import Cookies from "universal-cookie";
import MyListings from "./components/MyListings";

class App extends Component {

    constructor(props){
        super(props);
        let isAuthorized = false;
        const cookies = new Cookies();
        if (cookies.get('token') != null) {
            isAuthorized = true;
        }
        this.state = {
            auth: isAuthorized,
        };
        this.updateNav = this.updateNav.bind(this);
    }

    render() {
        return (
            <React.Fragment>
                <Navbar auth={this.state.auth}/>
                <Switch>
                    <Route exact path="/" component={ProductList}/>
                    <Route path="/details" component={Details}/>
                    <Route path="/cart" component={Cart}/>
                    <Route path="/chat" component={Chat}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/login" render={(props) => (<Login updateNav={this.updateNav} {...props}/>)} />
                    <Route path="/confirmation" component={Confirmation}/>
                    <Route path="/sell" render={(props) => (<Sell auth={this.state.auth}/>)} />
                    <Route path="/mylistings" component={MyListings}/>
                    <Route component={Default}/>
                </Switch>
                <Modal />
            </React.Fragment>


        );
    }

    updateNav = isAuth => {
        this.setState({auth: isAuth});
    }
}



export default App;
