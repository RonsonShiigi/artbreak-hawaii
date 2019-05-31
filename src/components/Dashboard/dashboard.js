import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";

import "./dashboard.css";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div class="profile-container">
        <div class="profile-cover" />
        <div class="profile-content">
          <Avatar alt="default" src="/" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
