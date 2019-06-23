import React, { Component } from "react";
import axios from "axios";

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      product_id: this.props.product_id,
      like_count: 0,
      likes_array: "",
      has_liked: false
    };
  }

  componentDidMount() {
    // console.log(localStorage.getItem("userId"));
    this.setState({ user_id: localStorage.getItem("userId") });

    axios
      .get("http://localhost:8080/likes")
      .then(res => {
        let likesArr = res.data;
        this.setState({ likes_array: likesArr });
      })
      .then(data => {
        let counter = this.state.like_count;
        this.state.likes_array.map(like => {
          if (Number(like.product_id) === Number(this.state.product_id)) {
            counter++;
          }
          this.setState({ like_count: counter });
        });
      })
      .then(data => {
        this.state.likes_array.map(like => {
          if (
            Number(like.user_id) === Number(this.state.user_id) &&
            Number(like.product_id) === Number(this.state.product_id)
          ) {
            this.setState({ has_liked: true });
          }
        });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    let arr = this.state.likes_array;
    let id = Number(this.state.user_id);
    arr.map(like => {
      if (Number(like.user_id) === id) {
        this.setState({ has_liked: true });
      }
    });

    if (this.state.has_liked === false) {
      console.log("you are liking");
      this.postLike();
    }
  };

  postLike = () => {
    let data = {
      product_id: this.state.product_id,
      user_id: this.state.user_id
    };

    axios
      .post("http://localhost:8080/likes", data)
      .then(data => {
        this.setState({ has_liked: true });
      })
      .then(data => {
        let counter = this.state.like_count;
        counter++;
        this.setState({ like_count: counter });
      })
      .catch(err => {
        console.log("errrrrror", err);
      });
  };

  render() {
    console.log("likes state", this.state);
    return (
      <div className="likes-container">
        <h1>Likes</h1>
        <h1>{this.state.like_count}</h1>
        <button onClick={this.handleSubmit}>Like Dis</button>
      </div>
    );
  }
}

export default Likes;
