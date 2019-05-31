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
    let total = 0;
    return (
      <div>
        {items.map(item => (
          <div>
            <div>{item.title}</div>
            <div>${item.price}</div>
            <button>Delete</button>
          </div>
        ))}
        <div>
          Sub Total: ${items.forEach(item => (total += parseInt(item.price)))}
          {total.toFixed(2)}
        </div>
        <button>Proceed to Checkout</button>
      </div>
    );
  }
}

export default ShopCart;
