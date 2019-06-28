import React, { Component } from "react";
import Gallery from "../Gallery";
import UserGallery from "./userGallery";
import EditUser from "./EditUser";
import Avatar from "@material-ui/core/Avatar";

import "./profile.css";

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      profileblurb: "",
      contactlinks: "",
      avatarurl: "",
      created_at: "",
      editHidden: true
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ editHidden: !this.state.editHidden });
  }

  componentDidMount(req, res) {
    fetch(`http://localhost:8080/users/${this.props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          username: data.username,
          profileblurb: data.profileblurb,
          contactlinks: data.contactlinks,
          avatarurl: data.avatarurl,
          created_at: data.created_at,
          editHidden: true
        });
      });
  }
  render() {
    const data = this.state;
    const style = this.state.editHidden === true ? { display: "none" } : {};

    return (
      <div className="container">
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
              <div className="date-info">
                <svg class="svg-icon" viewBox="0 0 20 20">
                  <path
                    fill="#ccc"
                    d="M17.657,2.982H2.342c-0.234,0-0.425,0.191-0.425,0.426v10.21c0,0.234,0.191,0.426,0.425,0.426h3.404v2.553c0,0.397,0.48,0.547,0.725,0.302l2.889-2.854h8.298c0.234,0,0.426-0.191,0.426-0.426V3.408C18.083,3.174,17.892,2.982,17.657,2.982M17.232,13.192H9.185c-0.113,0-0.219,0.045-0.3,0.124l-2.289,2.262v-1.96c0-0.233-0.191-0.426-0.425-0.426H2.767V3.833h14.465V13.192z M10,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.488-0.668,1.488-1.489C11.488,7.905,10.821,7.237,10,7.237 M10,9.364c-0.352,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C10.638,9.077,10.351,9.364,10,9.364 M14.254,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489s1.489-0.668,1.489-1.489C15.743,7.905,15.075,7.237,14.254,7.237 M14.254,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.352,0,0.639,0.287,0.639,0.638C14.893,9.077,14.605,9.364,14.254,9.364 M5.746,7.237c-0.821,0-1.489,0.668-1.489,1.489c0,0.821,0.668,1.489,1.489,1.489c0.821,0,1.489-0.668,1.489-1.489C7.234,7.905,6.566,7.237,5.746,7.237 M5.746,9.364c-0.351,0-0.638-0.288-0.638-0.638c0-0.351,0.287-0.638,0.638-0.638c0.351,0,0.638,0.287,0.638,0.638C6.384,9.077,6.096,9.364,5.746,9.364"
                  />
                </svg>
              </div>
              <div className="user-blurb">
                <p>{data.profileblurb}</p>
                {localStorage.userId === this.props.match.params.id ? (
                  <div className="edit-holder">
                    <div onClick={this.handleChange}>edit profile</div>
                    <div className="edit-div" style={style}>
                      <EditUser profileblurb={this.props.profileblurb} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="user-gallery">
          <div className="glitch" data-text="UPLOADS" id="uploads-header">
            UPLOADS
          </div>
          <div className="user-uploads">
            <UserGallery />
          </div>
        </div>
      </div>
    );
  }
}

export default User;
