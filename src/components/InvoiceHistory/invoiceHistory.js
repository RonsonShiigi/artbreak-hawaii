import React, { Component } from "react";
import axios from "axios";

class InvoiceHistory extends Component {
  constructor() {
    super();
    this.state = {
      user_id: "",
      invoices: []
    };
  }

  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
    axios
      .get("http://localhost:8080/invoice")
      .then(res => {
        console.log("response from serve", res.data);
        this.setState({ invoices: res.data });
      })
      .then(data => {
        let jah = this.state.invoices.filter(invoice => {
          if (Number(invoice.user_id) === Number(this.state.user_id)) {
            return invoice;
          }
        });
        this.setState({ invoices: jah });
      });
  }

  render() {
    console.log("historyState", this.state);
    let invoiceList = this.state.invoices;
    console.log("il", invoiceList);
    return (
      <div className="form-holder">
        <h1>Invoice History</h1>
        {invoiceList.map(invoice => (
          <div className="invoiceContainer" key={invoice.id}>
            <div className="buyerEmail">Buyer Email: {invoice.buyerEmail}</div>
            <div className="purchased">Purchased:{invoice.paid.toString()}</div>
            <div className="price"> Price:${invoice.price}</div>
            <div className="created_at">Invoice Sent: {invoice.created_at}</div>
            <div className="purchased_at">
              Purchased At: {invoice.purchased_at}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default InvoiceHistory;
