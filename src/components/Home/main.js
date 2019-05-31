import React, { Component } from "react";

import Gallery from "../Gallery";
import Cover from "../Cover/cover";
import Search from "../search";

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
        <div className="body-container">
          <Cover />
          <Gallery />
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
