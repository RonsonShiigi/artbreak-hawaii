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
      created_at: ""
    };
  }

  componentDidMount(req, res) {
    console.log("GALLERYVIEW", this.props);
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
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
                <div className="date-info">join date: (date created)</div>A good
                fucking composition is the result of a hierarchy consisting of
                clearly contrasting elements set with distinct alignments
                containing irregular intervals of negative space. You need to
                sit down and sketch more fucking ideas because stalking your ex
                on facebook isn’t going to get you anywhere. Fuck. To go
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
