import React, { Component } from "react";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";

import CoverLayout from "./cover-layout";

const backgroundImg = require("../assets/banner.png");
const logo = require("../assets/logo.png");

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundColor: grey[900],
    backgroundPosition: "center",
    top: 0
  },
  typography: {
    position: "absolute",
    top: "100"
  },
  cover: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "absolute",
    top: "25vh",
    height: "10vh"
  },
  arrow: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    top: 80
  }
});

function Cover(props) {
  const { classes } = props;
  return (
    <CoverLayout>
      <div className={classes.cover}>
        <img src={logo} style={{ opacity: 0.7 }} />
        <Typography
          color="#000"
          align="center"
          variant="h2"
          marked="center"
          style={{ marginTop: 2 }}
        >
          artbreak.
        </Typography>
        <div className={classes.arrow}>
          <KeyboardArrowDown fontSize="large" />
        </div>
      </div>
    </CoverLayout>
  );
}

export default withStyles(styles)(Cover);
