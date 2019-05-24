import React, { Component } from "react";
import axios from "axios";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

class Gallery extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    axios.get("http://localhost:8080/products").then(res => {
      const products = res.data;
      this.setState({ products });
    });
  }

  render() {
    const { products } = this.state;
    console.log(products);

    return (
      <GridList>
        {products.map(product => (
          <GridListTile>
            <img src={product.image_url} alt="" />
            <GridListTileBar title={product.title} />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}
export default Gallery;
