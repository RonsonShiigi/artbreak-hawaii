import React from "react";

import withRoot from "./components/modules/withRoot";
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

function App() {
  return (
    <React.Fragment>
      <Header />
      <Gallery />
      <Switch>
        <Route exact path="/register" component={Register} />
      </Switch>
    </React.Fragment>
  );
}

export default withRoot(App);
