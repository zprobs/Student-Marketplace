import React, {Component} from 'react';
import {Link} from "react-router-dom";
import { Redirect } from "react-router-dom";

class Registration extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            first_name:"",
            last_name:"",
            phone:"",
            school:"",
            address:"",
            redirect: null
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
        console.log(JSON.stringify(this.state));

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            if (xhr.responseText.includes('success')) {
                this.setState({ redirect: "/confirmation" });
            } else {
                alert("There was an error in signing up, please use a valid McGill email and try again. Error: " + xhr.responseText);
            }
        });

        xhr.open('POST', 'http://127.0.0.1:8000/auth/register');
        xhr.setRequestHeader("Content-type", "application/json");
        const sender = JSON.stringify(this.state);
        delete sender["redirect"];                  // using a field for redirection, do not want to send it to API
        xhr.send(sender);
        event.preventDefault();
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="m-5 justify-content-md-center ">

                <form onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" name="first_name" className="form-control" placeholder="First name" value={this.state.first_name} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" name="last_name" className="form-control" placeholder="Last name" value={this.state.last_name} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>School</label>
                        <input type="text" name="school" className="form-control" placeholder="School" value={this.state.school} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Address</label>
                        <input type="text"name="address"  className="form-control" placeholder="Address" value={this.state.address} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" name="phone" className="form-control" placeholder="Phone Number" value={this.state.phone_number} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required  />
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