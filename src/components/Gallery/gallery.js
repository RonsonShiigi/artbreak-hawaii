import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import { ButtonBase, Tab, Tabs } from "@material-ui/core";

const styles = theme => ({
  root: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4)
  },
  heading: {
    marginTop: theme.spacing(45)
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
    width: "100%"
  },
  imageWrapper: {
    position: "relative",
    display: "block",
    padding: 0,
    borderRadius: 0,
    height: "25vh",
    width: "30vh",
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      height: 100
    },
    "&:hover": {
      zIndex: 1
    },
    "&:hover $imageBackdrop": {
      opacity: 0.15
    },
    "&:hover $imageMarked": {
      opacity: 0
    },
    "&:hover $imageTitle": {
      border: "4px solid currentColor"
    }
  },
  imageButton: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white
  },
  imageSrc: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%"
  },
  imageBackdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create("opacity")
  },
  imageTitle: {
    position: "relative",
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px 14px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: 50,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

const Gallery = props => {
  console.log("props in products component", props);
  const { classes } = props;

  return (
    <div className={classes.root} component="section">
      <h1>new & popular</h1>
      <div className={classes.images}>
        {props.products.map((product, i) => (
          <ButtonBase
            key={i}
            className={classes.imageWrapper}
            style={{
              width: product.width
            }}
          >
            <div
              className={classes.imageSrc}
              style={{
                backgroundImage: `url(${product.image_url})`
              }}
            />
            <div className={classes.imageBackdrop} />
            <div className={classes.imageButton}>
              <h2>{product.title}</h2>
              <div className={classes.imageMarked} />
            </div>
          </ButtonBase>
        ))}
      </div>
    </div>
    // <GridList cellheight={150} cols={4} overflow="hidden">
    //   {props.products.map((product, i) => (
    //     <GridListTile key={i}>
    //       <img src={product.image_url} alt="" />
    //       <GridListTileBar title={product.title} />
    //     </GridListTile>
    //   ))}
    // </GridList>
  );
};

function mapStateToProps(state) {
  console.log("state products", state);
  return {
    products: state
  };
}

// const mapReduxStoreStateToTheComponentProps = state => {
//   return {
//     items: state,
//     lol: "say what"
//   };
// };

export default connect(mapStateToProps)(withStyles(styles)(Gallery));

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
