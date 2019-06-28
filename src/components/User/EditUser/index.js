import React, { Component } from "react";

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarurl: "",
      profileblurb: "",
      user_id: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editUser = e => {
    e.preventDefault();
    fetch(`http://35.167.36.255:8080/users/${localStorage.getItem("userId")}`, {
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
      .then(
        window.location.replace(
          `http://35.167.36.255:8081/users/${localStorage.getItem("userId")}`
        )
      )
      .catch(err => {
        console.log("ERROR", err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.editUser} className="user-edit">
          <textarea
            placeholder="write something about yourself"
            name="profileblurb"
            value={this.state.profileblurb}
            onChange={this.handleChange}
            className="blurb-input"
          />
          <button type="submit" className="btn">
            SAVE CHANGES
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default EditUser;
