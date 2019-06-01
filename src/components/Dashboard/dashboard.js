import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";

import "./dashboard.css";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div className="profile-container">
        <div className="profile-cover" />
        <div className="profile-content">
          <p className="user-head">
            <Avatar alt="default" src="/" />{" "}
            <h1 className="username">username</h1>
          </p>
          <p className="userinfo">join date(date created)</p>
        </div>
      </div>
    );
  }
}

export default Dashboard;
