import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import GridList from "@material-ui/core/GridList";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./App.css";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Header />
      <div>CONTENT CONTENT CONTENT</div>
      <Footer />
    </div>
  );
}

export default App;
