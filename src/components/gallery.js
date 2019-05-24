import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const Gallery = props => {
  console.log("props in products component", props);

  return (
    <GridList cellheight={150} cols={4} overflow="hidden">
      {props.products.map(product => (
        <GridListTile>
          <img src={product.image_url} alt="" />
          <GridListTileBar title={product.title} />
        </GridListTile>
      ))}
    </GridList>
  );
};

const mapReduxStoreStateToTheComponentProps = state => {
  return {
    items: state,
    lol: "say what"
  };
};

export default connect(mapReduxStoreStateToTheComponentProps)(Gallery);

// class Gallery extends Component {
//   state = {
//     products: []
//   };

//   componentDidMount() {
//     axios.get("http://localhost:8080/products").then(res => {
//       console.log(res.data);
//       const products = res.data;
//       this.setState({ products });
//     });
//   }

//   render() {
//     const { products } = this.state;
//     console.log(products);

//     return (
//       <GridList cellheight={150} cols={4} overflow="hidden">
//         {products.map(product => (
//           <GridListTile>
//             <img src={product.image_url} alt="" />
//             <GridListTileBar title={product.title} />
//           </GridListTile>
//         ))}
//       </GridList>
//     );
//   }
// }
// export default Gallery;
