import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/logout";
import "./header.css";

import { withStyles } from "@material-ui/core/styles";
import StripeReg from "../StripeReg/stripeReg.js";
import ButtonBase from "@material-ui/core/ButtonBase";

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
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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
          <ul>
            <li>
              <Link to="/login">
                <h2>Login</h2>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <h2>Register</h2>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <h2>profile</h2>
              </Link>
            </li>
          </ul>
          <Logout />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
