import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

import { withStyles } from "@material-ui/core/styles";

import ButtonBase from "@material-ui/core/ButtonBase";
import Typography from "@material-ui/core/Typography";

import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "100%",
    marginLeft: "5vh"
  },
  grow: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
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
          <Typography variant="h2" color="inherit" noWrap>
            ARTBREAK-HI
          </Typography>
        </Link>

        <ul>
          <li>
            <Link to="/login">
              <Typography>Login</Typography>
            </Link>
          </li>
          <li>
            <Link to="/register">
              <Typography>Register</Typography>
            </Link>
          </li>
        </ul>

        {/* <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
              >
                Register
                <Stars className={classes.rightIcon} />
              </Button> */}
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
