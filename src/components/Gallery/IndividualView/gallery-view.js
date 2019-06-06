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
  componentDidMount(req, res) {
    fetch("http://localhost:8080/products/12")
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log("DATAAATATATATA", data);
        this.setState({
          id: 0,
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
    return <div className="smoke-test">aaaaaa</div>;
  }
}

export default GalleryView;
