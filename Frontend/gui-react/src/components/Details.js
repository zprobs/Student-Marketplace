import React, {Component} from 'react';
import {ProductConsumer} from "../context";
import {Link} from "react-router-dom";
import {ButtonContainer} from "./Button";

class Details extends Component {
    render() {
        return (
            <ProductConsumer>
                {value =>{
                    const {id,seller__first_name,seller__last_name,seller__email,seller__phone,img,info,price,title,inCart,location} = value.detailProduct;
                    const mailto = 'mailto:' + seller__email;
                    return (
                        <div className="container py-5">
                            {/* title */}
                            <div className="row">
                                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                                   <h1>{title}</h1>
                                </div>
                            </div>
                            {/* end title */}
                            {/* product info */}
                            <div className="row">
                                <div className="col-10 mx-auto col-md-5 my-3">
                                    <img src={img} className="img-fluid" alt="product"/>
                                </div>
                                {/* product text */}
                                <div className="col-10 mx-auto col-md-5 my-3">
                                    <h2>Meet-up Location : {location}</h2>
                                    <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
                                         Listed by : <span className="text-uppercase">
                                        {seller__first_name} {seller__last_name}
                                    </span>
                                    </h4>
                                    <h4 className="text-blue">
                                        <strong>
                                            Price : <span>$</span>
                                            {price}
                                        </strong>
                                    </h4>
                                    <p className="text-capitalize font-weight-bold mt-3 mb-0">
                                        Some info about this product:
                                    </p>
                                    <p className="text-muted lead">
                                        {info}
                                    </p>

                                    <h4>Contact Info:</h4>
                                    <p className="mt-1">
                                        <a href={mailto}>{seller__email}</a>
                                    </p>
                                    <p className="text-blue">
                                        <strong>{seller__phone}</strong>
                                    </p>

                                    {/* buttons */}
                                    <div>
                                        <Link to='/'>
                                            <ButtonContainer>back to products
                                            </ButtonContainer>
                                        </Link>
                                        <ButtonContainer cart disabled={inCart?true:false} onClick={()=>{
                                            value.addToCart(id);
                                        }}>
                                            {inCart ? "inCart" : "add to cart"}
                                        </ButtonContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }}
            </ProductConsumer>
        );
    }
}

export default Details;