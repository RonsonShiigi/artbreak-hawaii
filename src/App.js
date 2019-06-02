import React, { Component } from "react";

import FileUpload from "./components/newProduct/newProduct";
import Main from "./components/Home/main";
import Header from "./components/Header/header";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import ShoppingCart from "./components/ShoppingCart/shoppingCart";
import stripeRedirect from "./components/StripeRedirect/stripeRedirect";

import Checkout from "./components/Checkout/checkout";
import Delete from "./components/Delete/delete";
import { Link } from "react-router-dom";

//react router imports
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//actions
import { getProducts } from "./actions/actions";

import { connect } from "react-redux";
import Axios from "axios";
import Dashboard from "./components/Dashboard/dashboard";

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("this.props", this.props);
    console.log(">>>>>>", this.props.getProducts());
    this.props.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/newProduct" component={FileUpload} />
          <Route path="/delete" component={Delete} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/cart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/sRegistration" component={stripeRedirect} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

console.log("filter data", getProducts());
let products = [{}];

export default connect(
  null,
  mapDispatchToProps
)(App);
