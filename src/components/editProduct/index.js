import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./editProduct.css";

class FileEdit extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      title: "",
      description: "",
      image_url: "",
      user_id: "",
      photos: null,
      product_id: 8
    };
  }

  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
    let pather = window.location.pathname.split("/");
    this.setState({ product_id: pather[2] });

    console.log("editstate", this.state);
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  editFile = e => {
    e.preventDefault();
    if (this.state.user_id === null) {
      console.log("you  must log in to edit product");
    } else {
      console.log("you are trying to delete");
      const url = "https://s3-us-west-2.amazonaws.com/artbreakjeh/";
      const formData = new FormData();
      axios
        .get("http://localhost:8080/products")
        .then(res => {
          let products = res.data;
          products.filter(product => {
            if (product.id === Number(this.state.product_id)) {
              this.setState({ product: product });
            }
          });
        })
        .then(data => {
          this.setState({ image_url: this.state.product.image_url });
          console.log("imageURL", this.state.image_url);
        })
        .then(data => {
          console.log("this is state", this.state);
          if (
            Number(this.state.user_id) !== Number(this.state.product.user_id)
          ) {
            throw new Error("ERROR: User unauthorized.");
          }
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
        .then(data => {
          console.log("this is state", this.state);
          formData.append("file", this.state.file[0]);
          axios
            .post("http://localhost:8080/newProduct/fiyah", formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            })
            .then(response => {
              console.log("response", response.data.key);
              let key = response.data.key;
              this.setState({ image_url: url + key });
            })
            .then(data => {
              console.log("updated state", this.state);
            })
            .then(data => {
              axios
                .post("http://localhost:8080/products", this.state)
                .then(res => {
                  console.log("response", res.data);
                })
                .catch(err => {
                  console.log("error in creating a new product", err);
                });
            })
            .catch(error => {
              console.log(error);
            });
        })

        .catch(err => {
          console.log(err);
        });
    }
  };

  handleFileEdit = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <div class="upload-form">
        <form onSubmit={this.editFile}>
          <input
            label="upload file"
            type="file"
            onChange={this.handleFileEdit}
          />
          <TextField
            id="title"
            label="title"
            name="title"
            fullWidth={true}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
          />
          <TextField
            id="description"
            label="description"
            name="description"
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
          />
          <br />

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth={true}
          >
            Send
          </Button>
        </form>
      </div>
    );
  }
}

export default FileEdit;
