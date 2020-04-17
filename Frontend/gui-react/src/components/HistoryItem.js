import React from "react";
export default function HistoryList({item}) {
    const{listing__title,listing__img,listing__price,count,created_at} = item;
    const img = "http://127.0.0.1:8000/media/" + listing__img;
    const total = listing__price * count;
    const date_obj = new Date(created_at.substr(0,10));
    const date = date_obj.toDateString();
    return (
        <div className="row my-2 text-capitalize text-center">
            <div className="col-10 mx-auto col-lg-2">
                <img src ={img} style={{width:'5rem', height:'5rem'}} className="img-fluid" alt="product"/>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">product: </span>
                {listing__title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">price: </span>
                {listing__price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <span className="d-lg-none">count: </span>
                {count}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">date: </span>
                {date}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong> purchase total : $ {total}</strong>
            </div>

        </div>
    )
}