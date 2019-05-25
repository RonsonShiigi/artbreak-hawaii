import React from "react";
import "./App.css";
import Header from "./components/header";
import Gallery from "./components/gallery";
import Register from "./components/register";

//react router imports
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from "react-router-dom";

const App = ({ products }) => {
  return (
    <div className="container">
      <Header />
      <div className="content">
        <Gallery />
      </div>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default App;
