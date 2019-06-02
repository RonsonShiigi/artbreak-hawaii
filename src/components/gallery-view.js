import React, { Component } from "react";

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
  componentDidMount() {
    fetch("http://localhost:8080/products/12")
      .then(res => {
        console.log("AAAAAA", res.json());
        // return res.json();
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
        }).catch(err => {
          console.log(err);
        });
      });
  }

  render() {
    return <div className="smoke-test">aaaaaa</div>;
  }
}

export default GalleryView;
