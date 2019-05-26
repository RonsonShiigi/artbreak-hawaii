import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";

class ShopCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
      //   title: "",
      //   description: "",
      //   image_url: "",
      //   user_id: "",
      //   price: null,
      //   seller_id: ""
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount = e => {
    const userId = 4;
    fetch(`http://localhost:8080/cart/${userId}`)
      .then(res => {
        return res.json();
      })
      .then(itemsData => {
        console.log("ITEMS DATA", itemsData);
        this.setState({ items: itemsData });
        console.log("This State", this.state.items);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    const { items } = this.state;
    console.log("ITEMS", items);
    return items.map(item => (
      <div>
        <div>{item.title}</div>
        <div>{item.price}</div>
      </div>
    ));
  }
}

export default ShopCart;
