import React, {Component} from 'react';

class Confirmation extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto text-center text-title text-uppercase pt-5">
                        <h2>Thank you for signing up!</h2>
                        <h3>Please check your inbox to confirm your email and begin shopping</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Confirmation;