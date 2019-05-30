import React, { Component } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { createProduct } from "../../actions/actions";
import { connect } from "react-redux";

class NewProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      image_url: "",
      user_id: "",
      price: "",
      photos: null
    };
  }

  handleChange = e => {
    // setValues({ ...values, [name]: e.target.value });
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  onChangeHandler = e => {
    this.setState({
      photos: e.target.files[0],
      loaded: 0
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("jah creation", this.state);
    // this.props.dispatch(createProduct(this.state));
    axios
      .post("http://localhost:8080/products", this.state)
      .then(res => {
        console.log("response", res.data);
      })
      .catch(err => {
        console.log("error in creating a new product", err);
      });
  };

  submitFile = e => {
    // console.log("hi");
    e.preventDefault();
    const formData = new FormData();

    formData.append("file", this.state.photos[0]);
    console.log("formdata", formData);
    axios
      .post("http://localhost:8080/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        console.log("ok submitted");
      })
      .catch(err => {
        console.log(err);
      });
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   console.log("SUBMITTING NEW THANG");
  //   console.log("state", values);
  //   fetch("http://localhost:8080/products", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "multipart/form-data"
  //     },
  //     body: JSON.stringify({
  //       title: values.title,
  //       description: values.description,
  //       price: values.price
  //     }),
  //     body: {
  //       file: values.file
  //     }
  //   })
  //     .then(() => {
  //       console.log("You added your shit");
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  render() {
    return (
      <div className="containz">
        <form enctype="multipart/form-data" onSubmit={this.handleSubmit}>
          <TextField
            id="title"
            label="title"
            name="title"
            // value={values.title}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            id="description"
            label="description"
            name="description"
            // value={values.description}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            id="price"
            label="price"
            name="price"
            // value={values.price}
            onChange={this.handleChange}
            margin="normal"
          />
          <TextField
            id="user_id"
            label="user_id"
            name="user_id"
            // value={values.price}
            onChange={this.handleChange}
            margin="normal"
          />
          <input name="photos" onChange={this.onChangeHandler} type="file" />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}

export default connect()(NewProduct);
