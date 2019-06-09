import React, { Component } from "react";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarurl: "",
      contactlinks: "",
      profileblurb: "",
      user_id: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  editUser = e => {
    e.preventDefault();
    console.log("userid", this.state.user_id);
    console.log("HITTTTTTT");
    fetch(`http://localhost:8080/users/5`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatarurl: this.state.avatarurl,
        contactlinks: this.state.contactlinks,
        profileblurb: this.state.profileblurb
      })
    }).catch(err => {
      console.log("ERROR", err);
    });
  };

  render() {
    return (
      <form onSubmit={this.editUser}>
        <input
          type="text"
          placeholder="eeeHHHH"
          name="profileblurb"
          value={this.state.profileblurb}
          onChange={this.handleChange}
        />
        <input
          type="text"
          placeholder="ehhhhHHH"
          name="contactlinks"
          value={this.state.contactlinks}
          onChange={this.handleChange}
        />
        <input type="submit" label="Edit Profile" variant="outlined" />
      </form>
    );
  }
}

export default EditUser;
