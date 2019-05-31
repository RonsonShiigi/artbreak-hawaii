import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import { withStyles } from "@material-ui/core/styles";

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
    const { classes } = this.props;

    return (
      <div className="header-links">
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>ARTBREAK-HI</h1>
        </Link>

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
            <Link to="/dashboard">
              <h2>Dashboard</h2>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
