import React, { Component } from "react";
import axios from "axios";

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      product_id: this.props.product_id,
      like_count: 0,
      likes_array: ""
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
      });
  }

  render() {
    console.log("likes state", this.state);
    return (
      <div className="likes-container">
        <h1>Likes</h1>
        <h1>{this.state.like_count}</h1>
        <button>Like Dis</button>
      </div>
    );
  }
}

export default Likes;
