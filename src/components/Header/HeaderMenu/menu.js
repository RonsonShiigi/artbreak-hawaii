import React, { Component } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";

export default function HeaderMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div className="header-menu">
      <Button onClick={handleClick} style={{ color: "white" }}>
        Navigation
      </Button>
      <Menu
        id="base-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link to="/login">
          <MenuItem onClick={handleClose}>Login</MenuItem>
        </Link>
        <Link to="/register">
          <MenuItem onClick={handleClose}>Register</MenuItem>
        </Link>
        <Link to="profile">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
