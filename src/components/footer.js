import React from "react";
import { Component } from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PermIdentity from "@material-ui/icons/PermIdentity";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";

class Footer extends Component {
  constructor(props) {
    super(props);
    // state = {
    //   value: "recents"
    // };

    // handleChange = (event, value) => {
    //   this.setState({ value });
    // };
  }

  render() {
    return (
      <BottomNavigation
        showLabels
        position="fixed"
        anchorOrigin={{ vertical: "bottom" }}
      >
        <BottomNavigationAction
          label="My Dashboard"
          icon={<LocationOnIcon />}
        />
        <BottomNavigationAction label="My Profile" icon={<PermIdentity />} />
        <BottomNavigationAction label="My Likes" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="My Basket" icon={<ShoppingBasket />} />
      </BottomNavigation>
    );
  }
}

export default Footer;
