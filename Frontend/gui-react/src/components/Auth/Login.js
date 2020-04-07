import React, {Component} from 'react';
import {Link} from "react-router-dom";

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            LoginErrors:""
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
                    <h3>Login</h3>


                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required  />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

                </form>
                <p className="forgot-password text-right">
                    Want to create an account? <Link to="/registration">Sign up</Link>
                </p>
            </div>
        );
    }
}

export default Login;