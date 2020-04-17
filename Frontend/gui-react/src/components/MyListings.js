import React, {Component} from 'react';
import {ProductConsumer} from "../context";
import Title from "./Title";
import CartColumns from "./Cart/CartColumns";
import MyListingsItem from "./MyListingsItem";
import Cookies from "universal-cookie/cjs";
import {Redirect} from "react-router-dom";

class MyListings extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        const xhr = new XMLHttpRequest();
        const cookie = new Cookies();
        const token = cookie.get('token');

        this.state = {
            token: token,
            redirect: null
        }

        /*
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText);
        });
        xhr.open('POST', 'http://127.0.0.1:8000/transactions/get/seller/' + cookie.get('id'));
        xhr.setRequestHeader('Authorization', "Token " + token)
        xhr.send();
        */


    }


    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {myListings} = value;
                        const {setProducts} = value;
                        if (myListings.length > 0) {
                            return (
                                <React.Fragment>
                                    <Title name="My" title="Listings" />
                                    <CartColumns seller={true} history={false}/>

                                    <div className="container-fluid">
                                        {myListings.map(item=>{
                                            return <MyListingsItem key={item.id} item={item} value={value} />;
                                        })}
                                    </div>

                                    <button onClick={() => {this.handleSubmit(myListings, setProducts)}} className="btn btn-primary btn-block w-50 mt-4 mx-auto">Save Changes</button>

                                </React.Fragment>
                            )
                        } else {
                            return ( <h1>You do not have any active listings</h1> );
                        }
                    }}
                </ProductConsumer>
            </section>
        );
    }

    handleSubmit(myListings, setProducts) {

        let success = true;
        let xhr = new XMLHttpRequest();
        let errorMsg = "";
        xhr.addEventListener('load', () => {
            if (!xhr.responseText.includes('success')) {
                success = false;
                console.log(xhr.responseText);
                errorMsg += xhr.responseText;
            }
            // only set the state and view errors after all requests have been received
            if (success) {
                this.setState({ redirect: "/" });
                setProducts();
            } else {
                alert("There was an error in updating one of your listings: " + errorMsg);
            }
        });

        myListings.map((listing) => {
            console.log(listing.id);
            xhr.open('PUT', 'http://127.0.0.1:8000/listings/update/' + listing.id + '/');
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader('Authorization', 'Token ' + this.state.token );
            delete listing["img"];
            xhr.send(JSON.stringify(listing));
        });

    }

}

export default MyListings;