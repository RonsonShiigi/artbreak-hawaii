import React, { Component } from "react";

import withRoot from "../modules/withRoot";
import Header from "../Header/header";
import Gallery from "../Gallery/gallery";
import Cover from "../Cover/cover";

//actions
import { getProducts } from "../../actions/actions";

import { connect } from "react-redux";

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
