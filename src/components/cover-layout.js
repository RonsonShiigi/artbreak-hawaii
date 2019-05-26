import React from "react";
import clsx from "clsx";
import grey from "@material-ui/core/colors/grey";
import { spacing } from "@material-ui/system";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
      minHeight: 500,
      maxHeight: 1300
    }
  },
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing.unit * 3
  },
  backdrop: {
    position: "absolute",
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