import React, { Component } from "react";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarurl: "",
      contactlinks: "",
      profileblurb: ""
    };
  }
  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };
  editUser = e => {
    e.preventDefault();
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatarurl: this.state.avatarurl,
        contactlinks: this.state.contactlinks,
        profileblurb: this.state.profileblurb
      })
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
