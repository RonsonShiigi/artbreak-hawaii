import React from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
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

import CssBaseline from "@material-ui/core/CssBaseline";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const App = ({ products }) => {
  return (
    <div>
      <div className="container">
        <CssBaseline />
        <Header />
        <div className="content">
          <GridList cellheight={150} cols={4}>
            <Gallery />
          </GridList>
        </div>
      </div>
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default App;
