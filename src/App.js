import React, { Component } from "react";

import Main from "./components/Home/main";
import Header from "./components/Header/header";
import Register from "./components/Register/register";
import Login from "./components/Login/login";
import { Link } from "react-router-dom";

//react router imports
import { BrowserRouter as Router, Route } from "react-router-dom";

//actions
import { getProducts } from "./actions/actions";

import { connect } from "react-redux";
import Axios from "axios";

class App extends Component {
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
      <div>
        <Header />
        <Main />
      </div>
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
)(App);
