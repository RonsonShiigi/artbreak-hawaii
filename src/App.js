import React from "react";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Gallery from "./components/gallery";

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
          {/* maybe use .map on database items here? */}
          <GridList cellheight={150} cols={4}>
            <GridListTile>
              <img src="https://i.imgur.com/CC4EFLz.jpg" alt="" />
              <GridListTileBar title="FUCK" />
            </GridListTile>
            <GridListTile>
              <img src="https://i.imgur.com/4kSDdjn.jpg" alt="" />
              <GridListTileBar title="AAAAAA" />
            </GridListTile>
            <GridListTile>
              <img
                src="https://i.ytimg.com/vi/3z2EzQvpbok/maxresdefault.jpg"
                alt=""
              />
              <GridListTileBar title="FUUUUCK" />
            </GridListTile>
            <GridListTile>
              <img
                src="https://cdn1.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg"
                alt=""
              />
              <GridListTileBar title="OH GOOOOD" />
            </GridListTile>
            <GridListTile>
              <img
                src="https://cdn.cnn.com/cnnnext/dam/assets/150324154010-04-internet-cats-restricted-super-169.jpg"
                alt=""
              />
              <GridListTileBar title="I'M ON FIIIRE" />
            </GridListTile>
          </GridList>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};
App.getInitialProps = async ({ req }) => {
  const res = await fetch("http://localhost:8080/products");
  // console.log("ressssss", res)
  const json = await res.json();
  return { products: json };
};

export default App;
