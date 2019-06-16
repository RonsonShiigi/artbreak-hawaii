import React, { Component } from "react";

import "./gallery-view.css";

class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      description: "",
      image_url: "",
      user_id: 0,
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
        <div className="view-inner">
          <a
            href={`${data.image_url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={data.image_url} className="img-style" alt="" />
          </a>
          <div className="img-info">
            <h1>{data.title}</h1>
            {data.description}
            <br />
            {data.created_at}
            <br />
            {localStorage.userId === this.props.match.params.id ? (
              <div className="img-links">
                <ul>
                  <li>
                    <a href={`/editProduct/${this.state.id}`}>Edit Here</a>
                  </li>
                  <li>
                    <a href={`/delete/${this.state.id}`}>Delete Me</a>
                  </li>
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TestComponent;
