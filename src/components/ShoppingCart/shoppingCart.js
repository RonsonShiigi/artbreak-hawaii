import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      subtotal: "",
      fees: "",
      itemId: ""
    };
  }
  componentDidMount = e => {
    const userId = 4; //NEED TO CHANGE TO BE DYNAMIC !!!!!!!!
    fetch(`http://localhost:8080/cart/${userId}`)
      .then(res => {
        return res.json();
      })
      .then(itemsData => {
        this.setState({ items: itemsData });
        console.log("ITEMS DATA STATE", this.state.items);

        //sum totals of all items in shopping cart by userid
        const itemTotal = itemsData
          .map(item => parseFloat(item.price), 10)
          .reduce((acc, curr) => (acc += curr))
          .toFixed(2);

        //calculate our platform fee off the sum of shopping cart total = 3.5% plus 30 cents for entire shopping cart transaction
        const platformFee = (itemTotal * 0.035 + 0.3).toFixed(2);

        this.setState({ fees: platformFee });
        console.log("FEEES", this.state.fees);

        this.setState({
          subtotal: (parseFloat(itemTotal) + parseFloat(platformFee)).toFixed(2)
        });
        console.log("SUB TOTAL FEE", this.state.subtotal);
      })
      .catch(err => {
        console.log("error", err);
      });
  };

  render() {
    const { items, subtotal, fees } = this.state;
    let total = 0;
    return (
      <div>
        <h2>Shopping Cart</h2>
        {items.map(item => (
          <div>
            <div name="title">{item.title}</div>
            <div name="price">${item.price}</div>
            <button>Delete</button>
          </div>
        ))}
        <div>Transaction Fee: {fees}</div>
        <div>Sub Total: ${subtotal}</div>
        <div>
          <Link to="/checkout">
            <Button>
              <h2>Proceed To Checkout</h2>
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
