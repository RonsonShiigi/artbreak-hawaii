import React, { Component } from "react";
import Gallery from "../Gallery";
import Avatar from "@material-ui/core/Avatar";

import "./profile.css";

class Profile extends Component {
  state = {};

  render() {
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
            <div className="glitch" data-text="username" id="user-glitch">
              username
              <div className="date-info">join date: (date created)</div>
              <div className="user-blurb">
                A good fucking composition is the result of a hierarchy
                consisting of clearly contrasting elements set with distinct
                alignments containing irregular intervals of negative space. You
                need to sit down and sketch more fucking ideas because stalking
                your ex on facebook isn’t going to get you anywhere. Fuck. To go
              </div>
              <div className="contact-links">contact links go here</div>
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

export default Profile;
