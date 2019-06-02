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
      price: "",
      photos: null,
      product_id: 8
    };
  }

  componentDidMount() {
    console.log(localStorage.getItem("userId"));
    this.state.user_id = localStorage.getItem("userId");
  }

  handleChange = e => {
    // setValues({ ...values, [name]: e.target.value });
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  // submitFile = event => {
  //   event.preventDefault();
  //   console.log("this is state", this.state);
  //   const url = "https://s3-us-west-2.amazonaws.com/artbreakjeh/";
  //   // const image_url = url + res.req.file.key;

  //   //posting to s3 axios call
  //   const formData = new FormData();
  //   console.log("formData", formData);

  //   formData.append("file", this.state.file[0]);
  //   axios
  //     .post(
  //       "http://localhost:8080/products/" + this.state.product_id,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       }
  //     )
  //     .then(response => {
  //       console.log("response", response.data.key);
  //     });

  //   // posting to postgresql axios request
  //   // axios
  //   //   .post("http://localhost:8080/products", this.state)
  //   //   .then(res => {
  //   //     console.log("response", res.data);
  //   //   })
  //   //   .catch(err => {
  //   //     console.log("error in creating a new product", err);
  //   //   });
  // };
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
          if (
            Number(this.state.user_id) !== Number(this.state.product.user_id)
          ) {
            throw new Error(
              "YOU FUCKED UP, you are not the owner of this product so you cant fucking edit it"
            );
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
            // .then(res => {
            //   res.redirect("/");
            // })
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
              this.state.image_url = url + key;
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
              // handle your error
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
            // value={values.title}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
          />
          <TextField
            id="description"
            label="description"
            name="description"
            // value={values.description}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
          />
          <TextField
            id="price"
            label="price"
            name="price"
            // value={values.price}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
          />
          <br />
          {/* <TextField
            id="user_id"
            label="user_id"
            name="user_id"
            // value={values.price}
            onChange={this.handleChange}
            margin="normal"
            fullWidth={true}
          /> */}

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
