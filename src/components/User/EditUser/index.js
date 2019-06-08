import React, { Component } from "react";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileblurb: ""
    };
  }
  componentDidMount() {
    this.state.user_id = localStorage.getItem("userId");
    let pather = window.location.pathname.split("/");

    this.state.product_id = pather[2];
    console.log("editstate", this.state);
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  render() {
    return <div />;
  }
}

export default EditUser;
