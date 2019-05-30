import React, { Component } from "react";

let products = [
  {
    name: "Leonard Rogers",
    email: "egestas@justonecante.org"
  },
  {
    name: "Walker Pace",
    email: "erat.eget.tincidunt@idsapienCras.org"
  },
  {
    name: "Lance Mcintyre",
    email: "Nam.ligula@quamvel.net"
  },
  {
    name: "Rudyard Conway",
    email: "sit@nunc.org"
  },
  {
    name: "Chadwick Oneal",
    email: "laoreet@dictum.edu"
  },
  {
    name: "Isaiah Kent",
    email: "diam.dictum@lobortisquam.co.uk"
  },
  {
    name: "Griffith Perkins",
    email: "congue@acfermentumvel.ca"
  },
  {
    name: "Lawrence Wheeler",
    email: "ac.libero@Duisac.org"
  },
  {
    name: "Preston Walker",
    email: "egestas.rhoncus@eudui.co.uk"
  },
  {
    name: "Simon Brewer",
    email: "nunc.sed@Fuscediamnunc.co.uk"
  }
];

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
