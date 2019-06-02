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
    fetch("http://localhost:8080/products/11")
      .then(res => {
        return res.clone().json();
      })
      .then(data => {
        console.log("DATAAATATATATA", data);
        this.setState({
          data
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
