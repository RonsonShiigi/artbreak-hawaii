import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

import Logout from "../Logout/logout";
import "./header.css";

import { withStyles } from "@material-ui/core/styles";
import StripeReg from "../StripeReg/stripeReg.js";

const styles = theme => ({
  root: {
    width: "100%",
    marginLeft: "5vh"
  },
  grow: {
    flexGrow: 1
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  }
});
class Header extends Component {
  state = {
    auth: true,
    anchorEl: null,
    user_id: "",
    username: ""
  };

  async componentDidMount() {
    if (localStorage.getItem("username") !== null) {
      this.state.user_id = localStorage.getItem("userId");
      this.state.username = localStorage.getItem("username");
    }
  }

  handleChange = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  getUsername = () => {
    return localStorage.getItem("username").toString();
  };

  render() {
    return (
      <div className="sticky">
        <div className="header-links">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="header-glitch" data-text="ARTBREAK-HI">
              ARTBREAK-HI
            </div>
          </Link>
          <StripeReg />
          {localStorage.getItem("username") === null ? (
            <ul>
              <li>
                <h3 className="login-welcome">You are not logged in.</h3>
              </li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/dashboard">My Dashboard</Link>
              </li>
              <li>
                <Link to="/messages">My Messages</Link>
              </li>
              <li>
                <h3 className="login-welcome">
                  Logged in as {this.getUsername()}
                </h3>
              </li>
              <li>
                <Logout />
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
