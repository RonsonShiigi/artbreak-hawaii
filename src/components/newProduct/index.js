import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./newproduct.css";

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      title: "",
      description: "",
      image_url: "",
      user_id: "",
      price: "",
      photos: null
    };
  }

  componentDidMount() {
    // console.log("local storage id", localStorage.getItem("userId"));
    this.state.user_id = localStorage.getItem("userId");
  }

  handleChange = e => {
    // setValues({ ...values, [name]: e.target.value });
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  submitFile = event => {
    event.preventDefault();
    if (localStorage.getItem("userId") === null) {
      console.log("You are not logged in");
    } else {
      console.log("this is state", this.state);
      const url = "https://s3-us-west-2.amazonaws.com/artbreakjeh/";
      // const image_url = url + res.req.file.key;

      //posting to s3 axios call
      const formData = new FormData();
      console.log("formData", formData);

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
    }

    // posting to postgresql axios request
    // axios
    //   .post("http://localhost:8080/products", this.state)
    //   .then(res => {
    //     console.log("response", res.data);
    //   })
    //   .catch(err => {
    //     console.log("error in creating a new product", err);
    //   });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    return (
      <div class="upload-form">
        <form onSubmit={this.submitFile}>
          <input
            label="upload file"
            type="file"
            onChange={this.handleFileUpload}
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

export default FileUpload;
