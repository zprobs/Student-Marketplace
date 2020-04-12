import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
export default function MyListingsItem({item,value}) {

    const{id,title,img,price,total,count} = item;
    const {removeListing, updateListing} = value;
    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src = {img} style={{width:'5rem', height:'5rem'}} className="img-fluid" alt="product"/>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product: </span>
                <input type="text" value={title} onChange={(event) => {updateListing(event, {id}, 'title')}} />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product: </span>
                <input type="number" value={price} min="0" onChange={(event) => {updateListing(event, {id}, 'price')}}/>
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <input type="number" step="1" min="0" max="9999" value={count} onChange={(event) => {updateListing(event, {id}, 'count')}} />
                    </div>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeListing(id)}>
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>$ {total}</strong>
            </div>

        </div>
    )
}

