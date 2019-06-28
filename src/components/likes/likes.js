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
      .get("http://35.167.36.255:8080/likes")
      .then(res => {
        let likesArr = res.data;
        this.setState({ likes_array: likesArr });
      })
      .then(data => {
        let counter = this.state.like_count;
        this.state.likes_array.map(like => {
          if (Number(like.product_id) === Number(this.state.product_id)) {
            return counter++;
          }
          return this.setState({ like_count: counter });
        });
      })
      .then(data => {
        this.state.likes_array.map(like => {
          if (
            Number(like.user_id) === Number(this.state.user_id) &&
            Number(like.product_id) === Number(this.state.product_id)
          ) {
            return this.setState({ has_liked: true });
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
      this.postLike();
    }
  };

  postLike = () => {
    let data = {
      product_id: this.state.product_id,
      user_id: this.state.user_id
    };

    axios
      .post("http://35.167.36.255:8080/likes", data)
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
        {this.state.like_count}
        <svg className="likes-svg" onClick={this.handleSubmit}>
          {this.state.has_liked === true ? (
            <path
              d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
              fill="#ccc"
            />
          ) : (
            <path
              d="M15.653 19.415c-1.162 1.141-2.389 2.331-3.653 3.585-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 1.269-.424 2.546-1.154 3.861l-1.483-1.484c.403-.836.637-1.631.637-2.377 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.239-2.191 1.414 1.414zm7.347-5.415h-3v-3h-2v3h-3v2h3v3h2v-3h3v-2z"
              fill="#ccc"
            />
          )}
        </svg>
      </div>
    );
  }
}

export default Likes;
