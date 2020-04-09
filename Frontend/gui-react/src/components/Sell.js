import React, {Component} from 'react';
import Cookies from "universal-cookie/cjs";

class Sell extends Component {

    constructor(props) {
        super(props);

        this.state = {
            seller:"",
            img:"",
            detail:"",
            title:"",
            price:"",
            count:"",
            location:"",
            info:"",
            is_active:false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleImage = this.handleImage.bind(this);
    }

    handleSubmit(event) {
     //   this.state.img = document.getElementById("inputImage").value;
        const cookies = new Cookies();
        const user = cookies.get('id');
        this.setState({
            seller: user,
            is_active: true
        });
        
    console.log(JSON.stringify(this.state));

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleImage(event) {
        let imgName = document.getElementById("inputImage").files[0].name;
        this.setState({img: imgName});
        document.getElementById("imageLabel").innerHTML = imgName;
    }


    render() {
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