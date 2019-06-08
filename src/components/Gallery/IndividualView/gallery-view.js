import React, { Component } from "react";
import Card from "@material-ui/core/Card";

import "./gallery-view.css";

class GalleryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      description: "",
      image_url: "",
      user_id: 0,
      price: "",
      created_at: 0,
      updated_at: 0
    };
  }
  componentDidMount(req, res) {
    fetch(`http://localhost:8080/products/${this.props.match.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          image_url: data.image_url,
          user_id: data.user_id,
          price: data.price,
          created_at: data.created_at,
          updated_at: data.updated_at
        });
      });
  }

  render() {
    const data = this.state;
    // console.log("galleryview state", data);
    return (
      <div className="galleryview">
        <h1>{data.title}</h1>
        <a href={`${data.image_url}`} target="_blank">
          <img src={data.image_url} className="img-style" />
        </a>
        <a href={`/editProduct/${this.state.id}`}>Edit Here</a>
        <a href={`/delete/${this.state.id}`}>Delete Me</a>
      </div>
    );
  }
}

export default GalleryView;
