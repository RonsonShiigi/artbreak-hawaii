import React, { Component } from "react";
import axios from "axios";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product_id,
      comments: [],
      commentsArr: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/comments")
      .then(res => {
        let data = res.data;
        this.setState({ commentsArr: data });
      })
      .then(data => {
        let jah = this.state.commentsArr.filter(comment => {
          if (Number(comment.product_id) === Number(this.state.product_id)) {
            return comment;
          }
        });
        this.setState({ comments: jah });
      })
      .then()

      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log("commentsState", this.state);
    let commentsList = this.state.comments;
    // console.log("comments state", this.state);
    return (
      <div className="comments-container">
        <h1>Comments</h1>

        {commentsList.map(comment => (
          <div className="box">
            <div className="body">{comment.text}</div>
            <div className="user">{comment.user_id}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Comments;
