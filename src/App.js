import React, { Component } from "react";

import withRoot from "./components/modules/withRoot";
import Header from "./components/header";
import Gallery from "./components/gallery";
import Register from "./components/register";
import Login from "./components/login";

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
      <div>
        <div className="container">
          <CssBaseline />
          <Header />
          <div className="content">
            {/* maybe use .map on database items here? */}
            <GridList cellheight={150} cols={4}>
              <Gallery />

              {/* <GridListTile>
              <img src="https://i.imgur.com/CC4EFLz.jpg" alt="" />
              <GridListTileBar title="FUCK" />
            </GridListTile>
            <GridListTile>
              <img src="https://i.imgur.com/4kSDdjn.jpg" alt="" />
              <GridListTileBar title="AAAAAA" />
            </GridListTile>
            <GridListTile>
              <img
                src="https://i.ytimg.com/vi/3z2EzQvpbok/maxresdefault.jpg"
                alt=""
              />
              <GridListTileBar title="FUUUUCK" />
            </GridListTile>
            <GridListTile>
              <img
                src="https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"
                alt=""
              />
              <GridListTileBar title="OH GOOOOD" />
            </GridListTile>
            <GridListTile>
              <img
                src="https://cdn.cnn.com/cnnnext/dam/assets/150324154010-04-internet-cats-restricted-super-169.jpg"
                alt=""
              />
              <GridListTileBar title="I'M ON FIIIRE" />
            </GridListTile> */}
            </GridList>
          </div>
          <Register />
          <Login />
        </div>
        <div className="footer">
          <Footer />
        </div>
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
)(withRoot(App));
