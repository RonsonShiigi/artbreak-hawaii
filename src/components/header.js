import React from "react";
import { Component } from "react";

import Register from "./register";
//react router imports
import { Link, Switch, Route } from "react-router-dom";

import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Stars from "@material-ui/icons/Stars";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ImageSearch from "@material-ui/icons/ImageSearch";
import Typography from "@material-ui/core/Typography";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";

import PropTypes from "prop-types";

const styles = theme => ({
  root: {
    width: "100%"
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
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
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
        <AppBar position="static" color="default" elevation="1">
          <Toolbar>
            <Typography variant="h2" color="inherit" noWrap>
              ARTBREAK-HI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <ImageSearch />
              </div>
              <InputBase
                placeholder="SEARCH"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={20} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <Button variant="contained" color="secondary">
                Login
                <Stars className={classes.rightIcon} />
              </Button>

              <Button
                variant="contained"
                color="secondary"
                component={Link}
                to="/register"
              >
                Register
                <Stars className={classes.rightIcon} />
              </Button>
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
