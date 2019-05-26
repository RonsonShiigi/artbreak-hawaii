import React from "react";
import clsx from "clsx";
import grey from "@material-ui/core/colors/grey";
import { spacing } from "@material-ui/system";

import { withStyles } from "@material-ui/core/styles";

const backgroundImg = require("./assets/banner.png");
const styles = theme => ({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
      minHeight: 500,
      maxHeight: 100
    }
  },
  main: {
    display: "flex",
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage: `url(${backgroundImg})`,
    marginBottom: theme.spacing(3)
  },
  backdrop: {
    display: "flex",
    position: "absolute",
    height: "100vh",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: grey[900],
    opacity: 0.5,
    zIndex: 1
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: -2
  }
});

function CoverLayout(props) {
  const { classes, children, bgClass } = props;

  return (
    <section className={classes.root}>
      <div className={classes.main}>
        {children}
        <div className={classes.backdrop} />
        <div className={clsx(classes.background, bgClass)} />
      </div>
    </section>
  );
}

export default withStyles(styles)(CoverLayout);
