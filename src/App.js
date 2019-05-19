import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import CssBaseline from "@material-ui/core/CssBaseline";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import "./App.css";

function App() {
  return (
    <div>
      <div className="container">
        <CssBaseline />
        <Header />
        <div class="content">
          <GridList cellheight={150} cols={4}>
            {/* maybe use .map on database items here? */}
            <GridListTile>
              <img src="https://i.imgur.com/CC4EFLz.jpg" />
            </GridListTile>
            <GridListTile>
              <img src="https://i.imgur.com/4kSDdjn.jpg" />
            </GridListTile>
            <GridListTile>
              <img src="https://i.ytimg.com/vi/3z2EzQvpbok/maxresdefault.jpg" />
            </GridListTile>
            <GridListTile>
              <img src="https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg" />
            </GridListTile>
            <GridListTile>
              <img src="https://cdn.cnn.com/cnnnext/dam/assets/150324154010-04-internet-cats-restricted-super-169.jpg" />
            </GridListTile>
          </GridList>
        </div>
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
