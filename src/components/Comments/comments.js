import React, { Component } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
          console.log("you fucked up", err);
        });
    }
  };

  render() {
    // console.log("commentsState", this.state);
    let commentsList = this.state.comments;

    return (
      <div className="comments-container">
        <h1>Comments</h1>

        {commentsList.map(comment => (
          <div className="box">
            <div className="body">{comment.text}</div>
            <div className="username">{comment.username}</div>
            <div clasName="when">{comment.created_at}</div>
          </div>
        ))}

        <div className="formContainer">
          <h1>Talk Shit Here</h1>
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="text"
              label="Comment Here"
              name="text"
              onChange={this.handleChange}
            />
            <Button type="submit">Send Now =></Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Comments;
