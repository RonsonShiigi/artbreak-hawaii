import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import "./gallery.css";
import { ButtonBase } from "@material-ui/core";

const styles = theme => ({
  root: {},
  heading: {
    marginTop: theme.spacing(45)
  },
  images: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexWrap: "wrap",
    position: "relative",
    paddingLeft: "2vh",
    left: "0"
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
      height: "100%"
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
    color: "#C5CFC6"
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
    background: "#C5CFC6",
    position: "absolute",
    bottom: 50,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity")
  }
});

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      products: [],
      showModal: false
    };
  }
  componentDidMount(req, res) {
    fetch("http://localhost:8080/products")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => {
        console.log(err);
      });
    this.refs.search.focus();
  }

  handleChange = () => {
    this.setState({
      searchString: this.refs.search.value
    });
  };

  viewImg = () => {
    this.setState({ show: !this.state.show });
    console.log(this.state.show);
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    let _products = this.state.products;
    let search = this.state.searchString.trim().toLowerCase();
    const { classes } = this.props;

    if (search.length > 0) {
      _products = _products.filter(function(product) {
        return product.title.toLowerCase().match(search);
      });
    }

    // const style = this.state.show === true ? { display: "none" } : {};

    return (
      <div className={classes.root} component="section">
        <input
          type="text"
          value={this.state.searchString}
          ref="search"
          onChange={this.handleChange}
          placeholder="SEARCH..."
        />

        <div className={classes.images}>
          {_products.map(product => (
            <div>
              <Link
                to={{
                  pathname: `/products/${product.id}`
                }}
                key={product.id}
              >
                <ButtonBase
                  key={product.id}
                  className={classes.imageWrapper}
                  onClick={this.handleOpenModal}
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("state products", state);
  return {
    products: state
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Gallery));
