import React, { Component } from "react";
import axios from "axios";
import InvoiceReceipt from "../InvoiceReceipt";

import "./historystyles.css";

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
      <div className="invoice-holder">
        {invoiceList.map(invoice => (
          <div className="invoice-container" key={invoice.id}>
            {invoice.paid.toString() === "true" ? (
              <div className="paid">paid</div>
            ) : (
              <div className="paid" style={{ backgroundColor: "#8B0000" }}>
                unpaid
              </div>
            )}
            {/* <ul className="invoice-receipt">
              <li>
                <b className="invoice-email">{invoice.buyerEmail}</b>
              </li>
              <li>Price: ${invoice.price}</li>
              <li>Purchased: {invoice.purchased_at}</li>
              <li>Description: {invoice.description}</li>
              <li>Sent: {invoice.created_at}</li>
            </ul>
          </div> */}
            <InvoiceReceipt
              buyerEmail={invoice.buyerEmail}
              invoice={invoice.charge_id}
              price={invoice.price}
              purchased_at={invoice.purchased_at}
              description={invoice.description}
              created_at={invoice.created_at}
              available_refund={invoice.refund_available}
              paid={invoice.paid}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default InvoiceHistory;
