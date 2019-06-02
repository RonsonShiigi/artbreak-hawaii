import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { PresignedPost } from "aws-sdk/clients/s3";

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image_url: "",
      //make this dynamic
      product_id: 9,
      product: "",
      user_id: ""
    };
  }

  componentDidMount() {}
  deleteFile = e => {
    e.preventDefault();
    console.log("you are trying to delete");
    axios
      .get("http://localhost:8080/products")
      .then(res => {
        let products = res.data;
        products.filter(product => {
          if (product.id === this.state.product_id) {
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
          // .then(res => {
          //   res.redirect("/");
          // })
          .catch(err => {
            console.log(err);
          });
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1>Are You Sure You Want To Delete This?</h1>

        <button onClick={this.deleteFile}>Delete</button>
      </div>
    );
  }
}

export default Delete;
