import React, { Component } from "react";

import withRoot from "./modules/withRoot";
import Header from "./header";
import Gallery from "./gallery";
import Cover from "./cover";
import Register from "./register";
import Login from "./login";

//react router imports
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

//actions
import { getProducts } from "../actions/actions";

import { connect } from "react-redux";
import Axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("this.props", this.props);
    console.log(">>>>>>", this.props.getProducts());
    this.props.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <Cover />
        <Gallery />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRoot(Main));
