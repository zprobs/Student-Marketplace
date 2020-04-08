import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Cookies from 'universal-cookie';
import { Redirect } from "react-router-dom";


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            redirect: null,
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
        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText);
            if (xhr.responseText.includes("token")) {
                const response = JSON.parse(xhr.responseText);
                const cookies = new Cookies();
                cookies.set('token', response.token, { path: '/' });
                cookies.set('id', response.user.id, { path: '/' });
                cookies.set('first_name', response.user.first_name, { path: '/' });
                cookies.set('last_name', response.user.last_name, { path: '/' });

                this.setState({ redirect: "/" });

            } else {
                alert("Sorry, Login unsuccessful, please try again");
            }

        });

        xhr.open('POST', 'http://127.0.0.1:8000/auth/login');
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(JSON.stringify(
            {
                username: this.state.email,
                password: this.state.password
                }
        ));
        event.preventDefault();
    }

    sign_out = () => {
        const cookies = new Cookies();
        cookies.remove('id');
        cookies.remove('first_name');
        cookies.remove('last_name');
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/auth/logout');
        xhr.setRequestHeader("Authorization", "Token " + cookies.get('token') );
        xhr.send();
        cookies.remove('token');
        this.forceUpdate();
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        const cookies = new Cookies();
        if (cookies.get('token') != null) {
            return (

                <div className="m-5 mx-auto w-50">
                    <h3>It appears you are already signed in. Would you like to log out?</h3>
                    <button className="btn btn-primary btn-block" onClick={this.sign_out}>Yes</button>
                    <Link to='/'>
                        <button className="btn btn-block btn-dark mt-1">No</button>
                    </Link>
                </div>
            )
        }
        return (
            <div className="m-5 justify-content-md-center ">

                <form onSubmit={this.handleSubmit}>
                    <h3>Login</h3>


                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter email" value={this.state.email} onChange={this.handleChange} required  />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.handleChange} required  />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Login</button>

                </form>
                <p className="forgot-password text-right">
                    Want to create an account? <Link to="/registration">Sign up</Link>
                </p>
            </div>
        );
    }
}

export default Login;