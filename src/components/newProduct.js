import React, { Component } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function NewProduct() {
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    image_url: "",
    user_id: "",
    price: "",
    file: []
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };

  // const handleFile = name => e => {
  //   setValues({ ...values, [name]: e.target.value.push(file) });
  // };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("SUBMITTING NEW THANG");
    console.log("state", values);
    fetch("http://localhost:8080/products", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        file: values.file,
        price: values.price
      })
    })
      .then(() => {
        console.log("You added your shit");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="containz">
      <form>
        <TextField
          id="title"
          label="title"
          value={values.title}
          onChange={handleChange("title")}
          margin="normal"
        />
        <TextField
          id="description"
          label="description"
          value={values.title}
          onChange={handleChange("description")}
          margin="normal"
        />
        <TextField
          id="price"
          label="price"
          value={values.title}
          onChange={handleChange("price")}
          margin="normal"
        />
        <input name="file" onChange={handleChange("file")} type="file" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default NewProduct;
