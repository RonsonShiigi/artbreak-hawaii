import React, { Component } from "react";
import { Redirect } from "react-router";

import axios from "axios";

class Refund extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      email: "",
      availableRefund: "",
      description: "",
      invoiceNumber: "",
      amount: "",
      redirect: false,
      redirectSuccess: false,
      overRefund: false
    };
  }

  componentDidMount() {
    console.log("This props.location", this.props.location);
    this.setState({ user_id: localStorage.getItem("userId") });
    if (this.props.location.invoice) {
      this.setState({ invoiceNumber: this.props.location.invoice });
    } else {
      this.setState({ redirect: true });
    }
    if (this.props.location.description) {
      this.setState({ description: this.props.location.description });
    }
    if (this.props.location.availableRefund) {
      this.setState({ availableRefund: this.props.location.availableRefund });
    }
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    console.log("THis State", this.state.amount);
  };

  handleSubmit = e => {
    console.log("CHARGE ID", this.state.chargeId);
    e.preventDefault();
    fetch(`http://localhost:8080/payment/refund`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        charge_id: this.state.invoiceNumber,
        amount: this.state.amount
      }),
      credentials: "include"
    })
      .then(res => {
        const resData = res.json();
        return resData;
      })
      .then(data => {
        switch (data.message) {
          case "Refund total more than refund available":
            this.setState({ overRefund: true });
            break;
          case "Refund Error":
            console.log("NOOOOOO");
            break;
          case "Success":
            this.setState({ redirectSuccess: true });
            break;
          case "Unknown Error":
            console.log("Unknown Error");
            break;
          case "Refund Error":
            console.log("Refund Error");
          default:
            return;
        }
        console.log("DATA", data);
      })
      .catch(err => {
        console.log("ERR", err);
      });
  };

  render() {
    const {
      chargeId,
      description,
      invoiceNumber,
      availableRefund,
      redirect,
      amount,
      overRefund,
      redirectSuccess
    } = this.state;

    return (
      <div>
        {redirect ? (
          <Redirect to="/dashboard" />
        ) : (
          <div className="container">
            <div className="form-holder">
              <h1 className="form-title">Create Refund</h1>
              <form onSubmit={this.handleSubmit}>
                {/* <svg class="svg-icon" viewBox="0 0 20 20">
              <path d="M16.999,4.975L16.999,4.975C16.999,4.975,16.999,4.975,16.999,4.975c-0.419-0.4-0.979-0.654-1.604-0.654H4.606c-0.584,0-1.104,0.236-1.514,0.593C3.076,4.928,3.05,4.925,3.037,4.943C3.034,4.945,3.035,4.95,3.032,4.953C2.574,5.379,2.276,5.975,2.276,6.649v6.702c0,1.285,1.045,2.329,2.33,2.329h10.79c1.285,0,2.328-1.044,2.328-2.329V6.649C17.724,5.989,17.441,5.399,16.999,4.975z M15.396,5.356c0.098,0,0.183,0.035,0.273,0.055l-5.668,4.735L4.382,5.401c0.075-0.014,0.145-0.045,0.224-0.045H15.396z M16.688,13.351c0,0.712-0.581,1.294-1.293,1.294H4.606c-0.714,0-1.294-0.582-1.294-1.294V6.649c0-0.235,0.081-0.445,0.192-0.636l6.162,5.205c0.096,0.081,0.215,0.122,0.334,0.122c0.118,0,0.235-0.041,0.333-0.12l6.189-5.171c0.099,0.181,0.168,0.38,0.168,0.6V13.351z" />
            </svg> */}
                <h2>Invoice Number</h2>
                <input
                  id="charge_id"
                  name="charge_id"
                  label="invoiceNumber"
                  defaultValue={invoiceNumber}
                />
                <h2>Description</h2>
                <input
                  id="description"
                  name="description"
                  label="description"
                  defaultValue={description}
                />
                <h2>Available for Refund</h2>
                <input
                  id="availableRefund"
                  name="availableRefund"
                  label="availableRefund"
                  defaultValue={availableRefund}
                />

                <svg className="svg-icon" viewBox="0 0 20 20">
                  <path d="M5.229,6.531H4.362c-0.239,0-0.434,0.193-0.434,0.434c0,0.239,0.194,0.434,0.434,0.434h0.868c0.24,0,0.434-0.194,0.434-0.434C5.663,6.724,5.469,6.531,5.229,6.531 M10,6.531c-1.916,0-3.47,1.554-3.47,3.47c0,1.916,1.554,3.47,3.47,3.47c1.916,0,3.47-1.555,3.47-3.47C13.47,8.084,11.916,6.531,10,6.531 M11.4,11.447c-0.071,0.164-0.169,0.299-0.294,0.406c-0.124,0.109-0.27,0.191-0.437,0.248c-0.167,0.057-0.298,0.09-0.492,0.098v0.402h-0.35v-0.402c-0.21-0.004-0.352-0.039-0.527-0.1c-0.175-0.064-0.324-0.154-0.449-0.27c-0.124-0.115-0.221-0.258-0.288-0.428c-0.068-0.17-0.1-0.363-0.096-0.583h0.664c-0.004,0.259,0.052,0.464,0.169,0.613c0.116,0.15,0.259,0.229,0.527,0.236v-1.427c-0.159-0.043-0.268-0.095-0.425-0.156c-0.157-0.061-0.299-0.139-0.425-0.235C8.852,9.752,8.75,9.631,8.672,9.486C8.594,9.34,8.556,9.16,8.556,8.944c0-0.189,0.036-0.355,0.108-0.498c0.072-0.144,0.169-0.264,0.292-0.36c0.122-0.097,0.263-0.17,0.422-0.221c0.159-0.052,0.277-0.077,0.451-0.077V7.401h0.35v0.387c0.174,0,0.29,0.023,0.445,0.071c0.155,0.047,0.29,0.118,0.404,0.212c0.115,0.095,0.206,0.215,0.274,0.359c0.067,0.146,0.103,0.315,0.103,0.508H10.74c-0.007-0.201-0.06-0.354-0.154-0.46c-0.096-0.106-0.199-0.159-0.408-0.159v1.244c0.174,0.047,0.296,0.102,0.462,0.165c0.167,0.063,0.314,0.144,0.443,0.241c0.128,0.099,0.23,0.221,0.309,0.366c0.077,0.146,0.116,0.324,0.116,0.536C11.509,11.092,11.473,11.283,11.4,11.447 M18.675,4.795H1.326c-0.479,0-0.868,0.389-0.868,0.868v8.674c0,0.479,0.389,0.867,0.868,0.867h17.349c0.479,0,0.867-0.389,0.867-0.867V5.664C19.542,5.184,19.153,4.795,18.675,4.795M1.76,5.664c0.24,0,0.434,0.193,0.434,0.434C2.193,6.336,2,6.531,1.76,6.531S1.326,6.336,1.326,6.097C1.326,5.857,1.52,5.664,1.76,5.664 M1.76,14.338c-0.24,0-0.434-0.195-0.434-0.434c0-0.24,0.194-0.434,0.434-0.434s0.434,0.193,0.434,0.434C2.193,14.143,2,14.338,1.76,14.338 M18.241,14.338c-0.24,0-0.435-0.195-0.435-0.434c0-0.24,0.194-0.434,0.435-0.434c0.239,0,0.434,0.193,0.434,0.434C18.675,14.143,18.48,14.338,18.241,14.338 M18.675,12.682c-0.137-0.049-0.281-0.08-0.434-0.08c-0.719,0-1.302,0.584-1.302,1.303c0,0.152,0.031,0.297,0.08,0.434H2.981c0.048-0.137,0.08-0.281,0.08-0.434c0-0.719-0.583-1.303-1.301-1.303c-0.153,0-0.297,0.031-0.434,0.08V7.318c0.136,0.049,0.28,0.08,0.434,0.08c0.718,0,1.301-0.583,1.301-1.301c0-0.153-0.032-0.298-0.08-0.434H17.02c-0.049,0.136-0.08,0.28-0.08,0.434c0,0.718,0.583,1.301,1.302,1.301c0.152,0,0.297-0.031,0.434-0.08V12.682z M18.241,6.531c-0.24,0-0.435-0.194-0.435-0.434c0-0.24,0.194-0.434,0.435-0.434c0.239,0,0.434,0.193,0.434,0.434C18.675,6.336,18.48,6.531,18.241,6.531 M9.22,8.896c0,0.095,0.019,0.175,0.058,0.242c0.039,0.066,0.088,0.124,0.148,0.171c0.061,0.047,0.13,0.086,0.21,0.115c0.079,0.028,0.11,0.055,0.192,0.073V8.319c-0.21,0-0.322,0.044-0.437,0.132C9.277,8.54,9.22,8.688,9.22,8.896 M15.639,12.602h-0.868c-0.239,0-0.434,0.195-0.434,0.434c0,0.24,0.194,0.436,0.434,0.436h0.868c0.24,0,0.434-0.195,0.434-0.436C16.072,12.797,15.879,12.602,15.639,12.602 M10.621,10.5c-0.068-0.052-0.145-0.093-0.23-0.124c-0.086-0.031-0.123-0.06-0.212-0.082v1.374c0.209-0.016,0.332-0.076,0.465-0.186c0.134-0.107,0.201-0.281,0.201-0.516c0-0.11-0.02-0.202-0.062-0.277C10.743,10.615,10.688,10.551,10.621,10.5" />
                </svg>

                <input
                  id="amount"
                  label="amount"
                  name="amount"
                  placeholder="amount"
                  type="number"
                  onChange={this.handleChange}
                />
                {overRefund ? (
                  <div>Amount entered is more than refund available</div>
                ) : null}
                <button type="submit" fullwidth="true">
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
        {redirectSuccess ? <Redirect to="/refundConfirmation" /> : null}
      </div>
    );
  }
}

export default Refund;
