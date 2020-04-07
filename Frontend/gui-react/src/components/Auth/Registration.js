import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            first_name:"",
            last_name:"",
            school:"",
            address:"",
            phone_number:"",
            registrationErrors:""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        console.log("form submitted");

        const {
            email,
            password,
        } = this.state

        event.preventDefault();
    }

    render() {
        return (
            <div className="m-5 justify-content-md-center ">

                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" className="form-control" placeholder="First name" value={this.state.first_name} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" className="form-control" placeholder="Last name" value={this.state.last_name} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>School</label>
                        <input type="text" className="form-control" placeholder="School" value={this.state.school} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" value={this.state.address} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" className="form-control" placeholder="Phone Number" value={this.state.phone_number} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required  />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                    <p className="forgot-password text-right">
                        Already registered? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        );
    }
}

export default Registration;