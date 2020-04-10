import React, {Component} from 'react';
import Cookies from "universal-cookie/cjs";
import { Redirect } from "react-router-dom";

class Sell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title:"",
            price:"",
            count:"",
            location:"",
            info:"",
            img: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    handleSubmit(data) {
     //   this.state.img = document.getElementById("inputImage").value;
        data.preventDefault();
        const cookies = new Cookies();
        const user = cookies.get('id');
        const token = cookies.get('token');

        const XHR = new XMLHttpRequest(), FD  = new FormData();
        FD.append('img', this.state.img, this.state.img.name);
        FD.append('seller', user);
        FD.append('detail', "detail");
        FD.append('title', this.state.title);
        FD.append('price', this.state.price);
        FD.append('count', this.state.count);
        FD.append('location', this.state.location);
        FD.append('info', this.state.info);
        FD.append('is_active', "true");

        // Define what happens on successful data submission
        XHR.addEventListener( 'load', () => {
            if (XHR.responseText.includes('success')) {
                this.setState({ redirect: "/" });
            } else {
                alert("There was an error in listing this product. Error: " + XHR.responseText);
            }
        } );

        // Define what happens in case of error
        XHR.addEventListener(' error', () => {
            alert( 'Oops! Something went wrong. Please try again.' );
        } );

        // Set up our request
        XHR.open( 'POST', 'http://127.0.0.1:8000/listings/create' );

        // Send our FormData object; HTTP headers are set automatically
        XHR.setRequestHeader('Authorization', 'Token ' + token );
        XHR.send( FD );

    console.log(JSON.stringify(this.state));

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleImage(event) {
        let imgName = document.getElementById("inputImage").files[0].name;
        document.getElementById("imageLabel").innerHTML = imgName;
        this.setState({
            img: event.target.files[0]
        });
    }


    render() {


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="mx-auto my-4 w-75">

            { this.props.auth ?
                <form onSubmit={this.handleSubmit}>
                    <h3>Sell a Product</h3>
                    <div className="form-group">
                        <label>Product Title</label>
                        <input type="text" name="title" className="form-control" placeholder="Product Title" value={this.state.title} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Information</label>
                        <textarea name="info" className="form-control" placeholder="Information" value={this.state.info} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" name="price" step="0.01" className="form-control" placeholder="Price" value={this.state.price} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Count</label>
                        <input type="number"name="count" step="1"  className="form-control" placeholder="How many are you selling?" value={this.state.count} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" name="location" className="form-control" placeholder="Where would you like to sell it?" value={this.state.location} onChange={this.handleChange} required  />
                    </div>

                    <div className="input-group mb-4">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="inputImage" accept="image/*" onChange={this.handleImage} />
                                <label className="custom-file-label" htmlFor="inputGroupFile01" id="imageLabel">Upload Image</label>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">List Product</button>


                </form>

                    :
                    <h2>You must be signed in to sell something</h2>
            }

            </div>
        );
    }
}

export default Sell;