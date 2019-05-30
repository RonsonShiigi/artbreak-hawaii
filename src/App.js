import React, { Component } from "react";

import withRoot from "./components/modules/withRoot";
import Main from "./components/main";
import Header from "./components/header";
import Register from "./components/register";
import NewProduct from "./components/newProduct";
import Login from "./components/login";
import FileUpload from "./components/newProduct2";

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
      <React.Fragment>
        <Header />
        <FileUpload />
        <Router>
          <div>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/newProduct" component={FileUpload} />
          </div>
        </Router>
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
)(App);
