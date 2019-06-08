import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dashtabs from "./Dashtabs";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      username: ""
    };
  }
  async componentDidMount() {
    // console.log("header console", localStorage.getItem("username"));
    if (localStorage.getItem("username") !== null) {
      this.state.user_id = localStorage.getItem("userId");
      this.state.username = localStorage.getItem("username");
    }
    console.log("header State", this.state);
  }

  render() {
    const { classes } = this.props;
    let products = this.state.products;
    console.log("THIS IS LOCALSTORAGE", localStorage.userId);
    return (
      <div className="dashboard-container">
        {localStorage.getItem("username") === null ? (
          <div className="not-logged-in">
            <h1>log tf in, heathen</h1>
          </div>
        ) : (
          <React.Fragment>
            <div className="left-nav">
              <ul className="left-links">
                <h3>Dashboard</h3>
                <li>
                  <Link to={`users/${localStorage.userId}`}>My Profile</Link>
                </li>
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
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Dashboard;
