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
              window.location.replace("http://localhost:8081/errorNewProduct");
            });
        })

        .catch(error => {
          window.location.replace("http://localhost:8081/errorNewProduct");
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
        <div className="form-holder">
          <form onSubmit={this.submitFile}>
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M18.344,16.174l-7.98-12.856c-0.172-0.288-0.586-0.288-0.758,0L1.627,16.217c0.339-0.543-0.603,0.668,0.384,0.682h15.991C18.893,16.891,18.167,15.961,18.344,16.174 M2.789,16.008l7.196-11.6l7.224,11.6H2.789z M10.455,7.552v3.561c0,0.244-0.199,0.445-0.443,0.445s-0.443-0.201-0.443-0.445V7.552c0-0.245,0.199-0.445,0.443-0.445S10.455,7.307,10.455,7.552M10.012,12.439c-0.733,0-1.33,0.6-1.33,1.336s0.597,1.336,1.33,1.336c0.734,0,1.33-0.6,1.33-1.336S10.746,12.439,10.012,12.439M10.012,14.221c-0.244,0-0.443-0.199-0.443-0.445c0-0.244,0.199-0.445,0.443-0.445s0.443,0.201,0.443,0.445C10.455,14.021,10.256,14.221,10.012,14.221" />
            </svg>
            <input
              type="text"
              id="title"
              placeholder="title"
              name="title"
              onChange={this.handleChange}
              margin="normal"
            />
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M14.999,8.543c0,0.229-0.188,0.417-0.416,0.417H5.417C5.187,8.959,5,8.772,5,8.543s0.188-0.417,0.417-0.417h9.167C14.812,8.126,14.999,8.314,14.999,8.543 M12.037,10.213H5.417C5.187,10.213,5,10.4,5,10.63c0,0.229,0.188,0.416,0.417,0.416h6.621c0.229,0,0.416-0.188,0.416-0.416C12.453,10.4,12.266,10.213,12.037,10.213 M14.583,6.046H5.417C5.187,6.046,5,6.233,5,6.463c0,0.229,0.188,0.417,0.417,0.417h9.167c0.229,0,0.416-0.188,0.416-0.417C14.999,6.233,14.812,6.046,14.583,6.046 M17.916,3.542v10c0,0.229-0.188,0.417-0.417,0.417H9.373l-2.829,2.796c-0.117,0.116-0.71,0.297-0.71-0.296v-2.5H2.5c-0.229,0-0.417-0.188-0.417-0.417v-10c0-0.229,0.188-0.417,0.417-0.417h15C17.729,3.126,17.916,3.313,17.916,3.542 M17.083,3.959H2.917v9.167H6.25c0.229,0,0.417,0.187,0.417,0.416v1.919l2.242-2.215c0.079-0.077,0.184-0.12,0.294-0.12h7.881V3.959z" />
            </svg>
            <input
              type="text"
              id="description"
              placeholder="description"
              name="description"
              // value={values.description}
              onChange={this.handleChange}
              margin="normal"
            />
            <br />
            <svg className="svg-icon" viewBox="0 0 20 20">
              <path d="M18.555,15.354V4.592c0-0.248-0.202-0.451-0.45-0.451H1.888c-0.248,0-0.451,0.203-0.451,0.451v10.808c0,0.559,0.751,0.451,0.451,0.451h16.217h0.005C18.793,15.851,18.478,14.814,18.555,15.354 M2.8,14.949l4.944-6.464l4.144,5.419c0.003,0.003,0.003,0.003,0.003,0.005l0.797,1.04H2.8z M13.822,14.949l-1.006-1.317l1.689-2.218l2.688,3.535H13.822z M17.654,14.064l-2.791-3.666c-0.181-0.237-0.535-0.237-0.716,0l-1.899,2.493l-4.146-5.42c-0.18-0.237-0.536-0.237-0.716,0l-5.047,6.598V5.042h15.316V14.064z M12.474,6.393c-0.869,0-1.577,0.707-1.577,1.576s0.708,1.576,1.577,1.576s1.577-0.707,1.577-1.576S13.343,6.393,12.474,6.393 M12.474,8.645c-0.371,0-0.676-0.304-0.676-0.676s0.305-0.676,0.676-0.676c0.372,0,0.676,0.304,0.676,0.676S12.846,8.645,12.474,8.645" />
            </svg>
            <input
              placholder="upload"
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
