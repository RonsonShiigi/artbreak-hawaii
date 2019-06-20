import React, { Component } from "react";
import axios from "axios";

import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { PresignedPost } from "aws-sdk/clients/s3";

const CustomButton = withStyles({
  root: {
    backgroundColor: "#D88A8A",
    "&:hover": {
      backgroundColor: "#ffffff"
    }
  }
})(Button);
class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: "",
      //make this dynamic
      product_id: "",
      product: "",
      user_id: ""
    };
  }

  componentDidMount() {
    this.state.user_id = localStorage.getItem("userId");
    let pather = window.location.pathname.split("/");

    this.state.product_id = pather[2];
  }

  deleteFile = e => {
    e.preventDefault();
    if (localStorage.getItem("userId") === null) {
      console.log("You have to be logged in to delete this!");
    } else {
      console.log("you are trying to delete");
      axios
        .get("http://localhost:8080/products")
        .then(res => {
          let products = res.data;
          products.filter(product => {
            if (product.id === Number(this.state.product_id)) {
              this.state.product = product;
            }
          });
        })
        .then(data => {
          this.state.image_url = this.state.product.image_url;
          console.log("imageURL", this.state.image_url);
        })
        .then(data => {
          console.log("this is state", this.state);
        })
        .then(data => {
          axios
            .delete("http://localhost:8080/products/" + this.state.product_id, {
              data: { body: this.state }
            })
            .then(data => {
              console.log("you are deleting from s3 and psql");
            })
            .catch(err => {
              console.log(err);
            });
        })

        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="header-title">Are You Sure You Want To Delete This?</h1>
        <CustomButton onClick={this.deleteFile}>Delete</CustomButton>
      </React.Fragment>
    );
  }
}

export default Delete;
