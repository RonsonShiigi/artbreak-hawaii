import React, { Component } from "react";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import CoverLayout from "./cover-layout";

const backgroundImg = require("./assets/banner.png");

const styles = theme => ({
  background: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundColor: grey[900],
    backgroundPosition: "center",
    top: 0
  }
});

function Cover(props) {
  const { classes } = props;
  return (
    <CoverLayout>
      <img src={backgroundImg} alt="" />
      <Typography color="inherit" align="center" variant="h5">
        MOM HOLY FUCK
      </Typography>
    </CoverLayout>
  );
}

export default withStyles(styles)(Cover);
