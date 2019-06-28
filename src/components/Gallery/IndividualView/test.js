import React, { Component } from "react";

class TestView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product_id,
      image_url: this.props.image_url
    };
  }

  render() {
    return (
      <div className="galleryview">
        <div className="view-inner">
          <img src={this.state.image_url} />
        </div>
      </div>
    );
  }
}

export default TestView;
