import React, { Component } from "react";
import Gallery from "../Gallery";
import Avatar from "@material-ui/core/Avatar";

import "./profile.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      first_name: "",
      last_name: "",
      profileblurb: "",
      created_at: ""
    };
  }

  componentDidMount(req, res) {
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          profileblurb: data.profileblurb,
          created_at: data.created_at
        });
      });
  }
  render() {
    const data = this.state;
    return (
      <div className="profile-container">
        <div className="profile-cover" />
        <div className="profile-content">
          <div className="user-head">
            <Avatar
              alt="default"
              src="https://i.imgur.com/tbaa3Y7.png"
              style={{
                height: 100,
                width: 100,
                zIndex: 1,
                marginRight: "25px"
              }}
            />
            <div
              className="glitch"
              data-text={`${data.username}`}
              id="user-glitch"
            >
              {data.username}
              <div className="user-blurb">
                <div className="date-info">join date: {data.created_at}</div>
                {data.profileblurb}
                <div className="contact-links">contact links go here</div>
              </div>
            </div>
          </div>
        </div>
        <div className="user-gallery">
          <div className="glitch" data-text="UPLOADS" id="uploads-header">
            UPLOADS
          </div>
          <div className="user-uploads">
            <Gallery />
          </div>
        </div>
      </div>
    );
  }
}

export default User;
