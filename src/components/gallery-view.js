import React, { Component } from "react";
import axios from "axios";

class View extends Component {
  state = {
    id: 0,
    title: "",
    description: "",
    image_url: "",
    user_id: 0,
    price: "10.00"
  };

  componentDidMount() {
    axios.get("http://localhost:8080/products/:id").then(res => {
      console.log(res.data);
      const { item } = res.data;
      this.setState({ item });
    });
  }
}
