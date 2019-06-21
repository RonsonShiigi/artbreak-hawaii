import React, { Component } from "react";
import axios from "axios";


class Likes extends Component{
    constructor(props){
        super(props);
        this.state = {
            user_id="",
            product_id=""
        }
    }


    componentDidMount() {
        // console.log(localStorage.getItem("userId"));
        this.setState({ user_id: localStorage.getItem("userId") });
        console.log("invoicestate", this.state);
        
    }
}

export default Likes;