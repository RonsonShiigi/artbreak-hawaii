import React from "react";
import { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <AppBar position="static" />
      </React.Fragment>
    );
  }
}

export default Header;
