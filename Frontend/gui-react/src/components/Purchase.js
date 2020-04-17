import React, {Component} from 'react';
import {ProductConsumer} from "../context";
import Cookies from "universal-cookie/cjs";
import { Redirect } from "react-router-dom";

class Purchase extends Component {

    constructor(props) {
        super(props);

        const cookie = new Cookies();
        const id = cookie.get('id');
        const token = cookie.get('token');

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText);
            if (!xhr.responseText.includes("Invalid token")) {

                const address = JSON.parse(xhr.responseText)['address']

                this.setState(  {
                    address: address,
                    auth: true
                });

            } else {
                cookie.remove('token');
                cookie.remove('id');
                console.log("not valid");
                this.setState( {
                    auth: false
                })
            }


        });

        xhr.open('GET', 'http://127.0.0.1:8000/auth/user');
        xhr.setRequestHeader("Authorization", "Token " + token);
        xhr.send();

        this.state = {
            auth:true,
            id:id,
            token:token
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange= this.handleChange.bind(this);
    }



    render() {

        return (

            <ProductConsumer>
                {
                    value => {
                        const {cart, cartTotal} = value;
                        const {clearCart} = value;

                        if (!this.state.auth) {
                            return (<Redirect to="/login" />);
                        }

                        if (this.state.redirect) {
                            return <Redirect to={this.state.redirect} />
                        }

                        if(cart.length > 0) {
                            return (
                                <div className="m-5 justify-content-md-center ">

                                    <form onSubmit={(event) => this.handleSubmit(event,cart,clearCart)}>
                                        <h3>Purchase Order: $({cartTotal})</h3>

                                        <div className="form-group">
                                            <label>Address</label>
                                            <input type="text" name="address" className="form-control" value={this.state.address || ""} onChange={this.handleChange} required  />
                                        </div>

                                        <button type="submit" className="btn btn-primary btn-block">Purchase</button>
                                    </form>
                                </div>
                                );
                        } else {
                            return (
                                    <div className="mx-auto mt-4 text-center">
                                        <h1>Please add items to your cart first</h1>
                                    </div>
                            );
                        }
                    }
                }

            </ProductConsumer>
        );


    }

    handleSubmit(event, cart, clearCart) {
        event.preventDefault();
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText);
            if (!xhr.responseText.includes("success")) {
                alert("There was an error processing your purchase: " + xhr.responseText);
            } else {
                alert("Your purchase was a success!");
                clearCart();
            }
            this.setState({
                redirect: "/"
            })
        });
        xhr.open('POST', 'http://127.0.0.1:8000/transactions/create');
        xhr.setRequestHeader("Authorization", "Token " + this.state.token);
        xhr.setRequestHeader("Content-type", "application/json");
        cart.map((item) => {
            const sender = JSON.stringify({
                address: this.state.address,
                count: item.quantity,
                buyer: this.state.id,
                listing: item.id
            });
            xhr.send(sender);
        });


    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
}

export default Purchase;