import React, { Component } from "react";
import Gallery from "../Gallery";
import Dashtabs from "./Dashtabs";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/products")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;
    let products = this.state.products;
    return (
      <div className="dashboard-container">
        <div className="left-nav">
          <ul className="left-links">
            <h3>Dashboard</h3>
            <li>My Profile</li>
            <li>My Uploads</li>
            <li>My Favorites</li>
            <li>My Orders</li>
          </ul>
        </div>
        <div className="right-nav">
          <div className="recents-div">
            <Dashtabs />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
