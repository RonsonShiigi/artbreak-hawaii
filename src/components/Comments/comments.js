import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./comments.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      product_id: this.props.product_id,
      comments: [],
      allCommentsArr: [],
      text: ""
    };
  }

  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
    axios
      .get("http://localhost:8080/comments")
      .then(res => {
        let data = res.data;
        this.setState({ allCommentsArr: data });
      })
      .then(data => {
        let jah = this.state.allCommentsArr.filter(comment => {
          if (Number(comment.product_id) === Number(this.state.product_id)) {
            return comment;
          }
        });
        this.setState({ comments: jah });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let obj = {
      user_id: this.state.user_id,
      text: this.state.text,
      product_id: this.state.product_id
    };
    if (localStorage.getItem("userId") === null) {
      console.log("You are not loggd in");
    } else {
      console.log("this is comments state", this.state);
      axios
        .post("http://localhost:8080/comments", obj)
        .then(res => {
          console.log("response", res.data);
        })
        .then(data => {
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    // console.log("commentsState", this.state);
    let commentsList = this.state.comments;

    return (
      <div className="comments-container">
        <div className="comment-holder">
          <form onSubmit={this.handleSubmit}>
            <textarea
              className="comment-form"
              id="text"
              placeholder="Leave a comment..."
              name="text"
              onChange={this.handleChange}
            />
            <button type="submit" className="cmmt-button">
              Send
            </button>
          </form>
        </div>

        <h1>Comments</h1>

        {commentsList.map(comment => (
          <div className="cmmt">
            <div className="cmmt-body">{comment.text}</div>
            <div className="cmmt-info">
              <span className="cmmt-user">
                <Link to={`/users/${comment.user_id}`}>{comment.username}</Link>
              </span>
              <br />
              <span className="cmmt-date">{comment.created_at}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Comments;
