import React, { Component } from "react";

import FileUpload from "./components/newProduct/newProduct";
import Main from "./components/Home/main";
import Header from "./components/Header/header";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import ShoppingCart from "./components/ShoppingCart/shoppingCart";
import StripeRedirect from "./components/StripeRedirect/stripeRedirect.js";

import Checkout from "./components/Checkout/checkout";
import Delete from "./components/Delete/delete";
import Edit from "./components/editProduct/editProduct";

//react router imports
import { Route, Switch } from "react-router-dom";

//actions
import { getProducts } from "./actions/actions";

import { connect } from "react-redux";
import profile from "./components/Profile/profile";
import GalleryView from "./components/Gallery/IndividualView/gallery-view";

class App extends Component {
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    return (
      <React.Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/products/:id" component={GalleryView} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/newProduct" component={FileUpload} />
          <Route path="/delete" component={Delete} />
          <Route path="/editProduct" component={Edit} />
          <Route path="/cart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
          <Route exact path="/sRegistration" component={StripeRedirect} />
          <Route path="/profile" component={profile} />
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
