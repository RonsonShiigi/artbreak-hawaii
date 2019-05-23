import React from "react";

import Header from "./header";
import Footer from "./footer";

import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/Appbar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Typography } from "@material-ui/core";

function LeftMenu(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.AppBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            aaaaAAAAAA
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List />
      </Drawer>
    </div>
  );
}

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <CssBaseline />
        SMOKE TEST
      </div>
    );
  }
}

export default Dashboard;
