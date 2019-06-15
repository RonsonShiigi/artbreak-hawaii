import React, { Component } from "react";
import axios from "axios";

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
      photos: null,
      id: ""
    };
  }

  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
    // this.state.user_id = localStorage.getItem("userId");
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
          // console.log("response", response.data.key);
          console.log("response", response.data);
          let key = response.data.key;
          this.setState({ image_url: url + key });
          // this.state.image_url = url + key;
        })
        .then(data => {
          // console.log("updated state", this.state);
        })
        .then(data => {
          axios
            .post("http://localhost:8080/products", this.state)
            .then(res => {
              console.log("response", res.data);
              this.state.id = res.data.id;
            })
            .then(data => {
              //make dynamic
              console.log("thenstate", this.state);
              window.location.replace(
                `http://localhost:8081/products/${this.state.id}`
              );
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
      <div className="container">
        <div className="upload-form">
          <form onSubmit={this.submitFile}>
            <input
              type="text"
              id="title"
              label="title"
              name="title"
              fullWidth={true}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
            />
            <input
              type="text"
              id="description"
              label="description"
              name="description"
              // value={values.description}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
            />
            <input
              type="text"
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
            <input
              label="upload file"
              type="file"
              onChange={this.handleFileUpload}
            />

            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    );
  }
}

export default FileUpload;
