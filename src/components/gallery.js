import fetch from "isomorphic-unfetch";
import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const Gallery = ({ products }) => {
  return (
    <React.Fragment>
      <GridList cellheight={150} cols={4}>
        {products.map(item => (
          <GridListTile>
            <img src={item.image_url} alt="" />
            <GridListTileBar title={item.title} />
          </GridListTile>
        ))}
      </GridList>
    </React.Fragment>
  );
};

Gallery.getInitialProps = async ({ req }) => {
  const res = await fetch("http://localhost:8080/products");
  // console.log("ressssss", res)
  const json = await res.json();
  return { products: json };
};

export default Gallery;
