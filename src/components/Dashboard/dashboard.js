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
    if (localStorage.getItem("username") !== null) {
      this.state.user_id = localStorage.getItem("userId");
      this.state.username = localStorage.getItem("username");
    }
  }

  render() {
    return (
      <div className="container">
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
                <li>My Orders/Invoices</li>
              </ul>
            </div>
            <div className="right-nav">
              <Dashtabs />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Dashboard;
