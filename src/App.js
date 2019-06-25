import React, { Component } from "react";

import FileUpload from "./components/newProduct/newProduct";
import NewProduct_Error from "./components/newProduct/error";
import Main from "./components/Home/main";
import Header from "./components/Header/header";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import ShoppingCart from "./components/ShoppingCart/shoppingCart";
import StripeRedirect from "./components/StripeRedirect/stripeRedirect.js";
import User from "./components/User/user";
import Dashboard from "./components/Dashboard/dashboard";
import Messages from "./components/Messages/message";
import ForgotPassword from "./components/ForgotPassword/forgotpassword";
import ResetPassword from "./components/ResetPassword/resetPassword";
import Invoice from "./components/Invoice/invoice";
import BuyerCheckout from "./components/BuyerCheckout/buyercheckout";
import Invoice_Confirmation from "./components/Invoice/invoice_confirmation";
import InvoiceHistory from "./components/InvoiceHistory/invoiceHistory";
import InvoiceError from "./components/Invoice/error";
import PaymentConfirmation from "./components/PaymentConfirmation/paymentConfirmation";
import Refund from "./components/Refund/";
import RefundConfirmation from "./components/RefundConfirmation/";
import Error from "./components/404";

import Checkout from "./components/Checkout/checkout";
import Delete from "./components/Delete/delete";
import Edit from "./components/editProduct/editProduct";

//react router imports
import { Route, Switch } from "react-router-dom";

//actions
import { getProducts } from "./actions/actions";

import { connect } from "react-redux";
import GalleryView from "./components/Gallery/IndividualView/gallery-view";

require("typeface-roboto");

class App extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <Header />

        <Switch>
          <Route path="/404" component={Error} />
          <Route exact path="/" component={Main} />
          <Route exact path="/products/:id" component={GalleryView} />
          <Route exact path="/users/:id" component={User} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Route path="/errorNewProduct" component={NewProduct_Error} />
          <Route path="/upload" component={FileUpload} />
          <Route path="/delete" component={Delete} />
          <Route path="/editProduct" component={Edit} />
          <Route path="/cart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
          <Route exact path="/sRegistration" component={StripeRedirect} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/messages" component={Messages} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/resetPassword" component={ResetPassword} />
          <Route path="/invoice" component={Invoice} />
          <Route path="/buyercheckout" component={BuyerCheckout} />
          <Route path="/paymentConfirmation" component={PaymentConfirmation} />
          <Route path="/invoiceConfirmation" component={Invoice_Confirmation} />
          <Route path="/invoiceHistory" component={InvoiceHistory} />
          <Route path="/refund" component={Refund} />
          <Route path="/refundConfirmation" component={RefundConfirmation} />
          <Route path="/invoiceError" component={InvoiceError} />
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

let products = [{}];

export default connect(
  null,
  mapDispatchToProps
)(App);
