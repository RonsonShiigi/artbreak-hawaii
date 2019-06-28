import React, { Component } from "react";
import axios from "axios";
import Refund from "../Refund";
import { Redirect } from "react-router";

class InvoiceReceipt extends Component {
  constructor() {
    super();
    this.state = {
      invoice: "",
      price: "",
      availableRefund: "",
      description: "",
      created_at: "",
      purchased_at: "",
      showRefund: false,
      isPaid: null
    };
  }

  componentDidMount() {
    const {
      invoice,
      price,
      puchased_at,
      description,
      created_at,
      available_refund,
      paid
    } = this.props;
    this.setState({
      invoice: invoice,
      price: price,
      description: description,
      availableRefund: available_refund,
      isPaid: paid
    });
  }

  renderRefund = () => {
    this.setState({ showRefund: true });
  };
  render() {
    const { showRefund, invoice, availableRefund, description } = this.state;
    console.log("Available Refund", availableRefund);
    return (
      <div>
        {showRefund ? (
          <Redirect
            to={{
              pathname: "/refund",
              invoice: invoice,
              description: description,
              availableRefund: availableRefund
            }}
          />
        ) : (
          <div>
            <ul className="invoice-receipt">
              <li>
                <b className="invoice-email">{this.props.buyerEmail}</b>
              </li>
              <li>Invoice: {this.props.invoice}</li>
              <li>Price: ${this.props.price}</li>
              <li>Purchased: {this.props.purchased_at}</li>
              <li>Description: {this.props.description}</li>
              <li>Sent: {this.props.created_at}</li>
              <li>Available For Refund: ${this.props.available_refund}</li>
            </ul>
            {this.props.paid ? (
              <button onClick={this.renderRefund}>Refund</button>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default InvoiceReceipt;
