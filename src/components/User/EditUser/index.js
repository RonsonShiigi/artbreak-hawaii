import React, { Component } from "react";
import Edit from "@material-ui/icons/Edit";

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
    fetch(`http://localhost:8080/users/${localStorage.getItem("userId")}`, {
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
    })
      .then(e =>
        window.location.replace(
          `http://localhost:8081/users/${localStorage.getItem("userId")}`
        )
      )
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Edit />
        <form onSubmit={this.editUser} className="user-edit">
          <input
            type="text"
            placeholder="eeeHHHH"
            name="profileblurb"
            value={this.state.profileblurb}
            onChange={this.handleChange}
            className="blurb-input"
          />
          <input
            type="text"
            placeholder="contact links"
            name="contactlinks"
            value={this.state.contactlinks}
            onChange={this.handleChange}
            className="contact-input"
          />
          <input type="submit" label="Edit Profile" variant="outlined" />
        </form>
      </React.Fragment>
    );
  }
}

export default EditUser;
