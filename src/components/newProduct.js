import React, { Component } from "react";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

function newProduct() {
  const [values, setValues] = React.useState({
    title: "",
    description: "",
    image_url: "",
    user_id: "",
    price: ""
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
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
      </form>
    </div>
  );
}

export default newProduct;
