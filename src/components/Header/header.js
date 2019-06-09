import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import Logout from "../Logout/logout";
import "./header.css";

import { withStyles } from "@material-ui/core/styles";
// import StripeReg from "../StripeReg/stripeReg.js";

import PropTypes from "prop-types";

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
    // console.log("header console", localStorage.getItem("username"));
    if (localStorage.getItem("username") !== null) {
      this.state.user_id = localStorage.getItem("userId");
      this.state.username = localStorage.getItem("username");
    }
    console.log("header State", this.state);
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
    // console.log("user is not logged in");
    return (
      <div className="sticky">
        <div className="header-links">
          <Link to="/" style={{ textDecoration: "none" }}>
            <div className="header-glitch" data-text="ARTBREAK-HI">
              ARTBREAK-HI
            </div>
          </Link>
          {localStorage.getItem("username") === null ? (
            <ul>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
              <li>BROWSE</li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/dashboard">My Dashboard</Link>
              </li>
              <li>
                <Link to="/messages">My Messages</Link>
              </li>
              <li>BROWSE</li>
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

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
