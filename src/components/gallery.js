import React, { Component } from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";

class Gallery extends Component {
  state = {
    products: []
  };

  componentDidMount() {
    axios.get("http://localhost:8080/products").then(res => {
      console.log(res.data);
      const products = res.data;
      this.setState({ products });
    });
  }

  render() {
    const { products } = this.state;
    console.log(products);

    return (
      <div className="holder">
        <GridList cellheight={150} cols={4} overflow="hidden">
          <GridListTile key="Subheader" cols={4} style={{ height: "auto" }}>
            <ListSubheader component="div">
              <Typography variant="h3">Recent</Typography>
            </ListSubheader>
          </GridListTile>
          {products.map(product => (
            <GridListTile>
              <img src={product.image_url} alt="" />
              <GridListTileBar title={product.title} />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}
export default Gallery;
