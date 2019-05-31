import React, { Component } from "react";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: "",
      products: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(req, res) {
    fetch("http://localhost:8080/products")
      .then(res => {
        return res.json();
      })
      .then(data => {
        this.setState({ products: data });
      })
      .catch(err => {
        console.log(err);
      });
    this.refs.search.focus();
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  render() {
    let _products = this.state.products;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _products = _products.filter(function(product) {
        return product.title.toLowerCase().match(search);
      });
    }

    return (
      <div>
        <h3>React - simple search</h3>
        <div>
          <input
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="type name here"
          />
          <ul>
            {_products.map(product => {
              return (
                <div>
                  <li>{product.title}</li>
                  <img style={{ width: "10%" }} src={product.image_url} />
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;
