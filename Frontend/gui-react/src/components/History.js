import React, {Component} from 'react';
import Cookies from "universal-cookie/cjs";
import {Redirect} from "react-router-dom";
import CartColumns from "./Cart/CartColumns";
import HistoryItem from "./HistoryItem";
import Title from "./Title";

class History extends Component {

    constructor(props) {
        super(props);

        const cookie = new Cookies();
        const id = cookie.get('id');
        const token = cookie.get('token');

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            console.log(xhr.responseText);
            if (!xhr.responseText.includes("Invalid token")) {

                const history = JSON.parse(xhr.responseText);

                this.setState(  {
                    history: history,
                    auth: true
                });

            } else {
                console.log("not valid");
                cookie.remove('token');
                cookie.remove('id');
                this.setState( {
                    auth: false
                })
            }


        });

        xhr.open('GET', 'http://127.0.0.1:8000/transactions/get/buyer/' + id  +'/');
        xhr.setRequestHeader("Authorization", "Token " + token);
        xhr.send();

        this.state = {
            auth:true,
            id:id,
            token:token,
            history: ""
        }


    }

    render() {

        if (this.state.auth) {

            if (this.state.history.length > 0) {
                return (
                    <React.Fragment>
                        <Title name="Purchase" title="History" />
                        <CartColumns seller={false} history={true}/>
                        <div className="container-fluid">
                            {this.state.history.map(item=>{
                                return <HistoryItem key={item.id} item={item}/>;
                            })}
                        </div>
                    </React.Fragment>
                );
            } else {
               return (
                   <div className="mx-auto mt-4 text-center">
                       <h1>No History available</h1>
                   </div>
               );
            }

        } else {
            return (
                <Redirect to="/login" />
            );
        }



    }

}

export default History;