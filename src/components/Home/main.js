import React, { Component } from "react";

import Gallery from "../Gallery";
import Cover from "../Cover/cover";

//actions
import { getProducts } from "../../actions/actions";

import { connect } from "react-redux";

class Main extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Cover />
          <div className="gallery-holder">
            <h1 className="header-title">new & popular</h1>
            <Gallery />
          </div>
        </div>
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
)(Main);
