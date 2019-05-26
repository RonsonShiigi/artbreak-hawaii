import React from "react";
import { Component } from "react";

import Register from "./register";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Stars from "@material-ui/icons/Stars";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Login from "./login";

import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: "#000"
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

  rightIcon: {
    marginLeft: theme.spacing(2)
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
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
      <React.Fragment>
        <AppBar position="fixed" elevation="1">
          <Toolbar color="#000">
            <a href="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h2" color="inherit" noWrap>
                ARTBREAK-HI
              </Typography>
            </a>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <a
                href="/login"
                style={{ color: "#fff", textDecoration: "none" }}
              >
                <ButtonBase color="main">
                  <Typography component="h3" variant="h6" color="inherit">
                    Login
                  </Typography>
                  <Stars className={classes.rightIcon} />
                </ButtonBase>
              </a>

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
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
