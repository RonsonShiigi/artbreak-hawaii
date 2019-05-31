import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import amber from "@material-ui/core/colors/amber";
import green from "@material-ui/core/colors/green";
import grey from "@material-ui/core/colors/grey";
import "typeface-roboto";

const rawTheme = createMuiTheme({
  palette: {
    primary: {
      light: "##ed4b82",
      main: "#28282a",
      dark: "#a31545"
    },
    secondary: {
      light: "#ed4b82",
      main: "#e91e63",
      dark: "#a31545"
    },
    warning: {
      main: amber[500],
      dark: amber[800]
    },
    error: {
      light: red[50],
      main: red[500],
      dark: red[700]
    },
    success: {
      light: green[50],
      main: green[500],
      dark: green[700]
    }
  },
  h1: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: 14,
    fontWeightLight: 300, // Work Sans
    fontWeightRegular: 400, // Work Sans
    fontWeightMedium: 700 // Roboto Condensed
  }
});
const fontHeader = {
  color: rawTheme.palette.text.primary,
  fontWeight: rawTheme.h1.fontWeightMedium,
  fontFamily: rawTheme.h1.fontFamilySecondary,
  textTransform: "uppercase"
};

const theme = {
  ...rawTheme,
  palette: {
    ...rawTheme.palette,
    background: {
      ...rawTheme.palette.background,
      default: rawTheme.palette.common.white,
      placeholder: grey[200]
    }
  },
  h1: {
    ...rawTheme.h1,
    fontHeader,
    h1: {
      ...rawTheme.h1.h1,
      ...fontHeader,
      letterSpacing: 0,
      fontSize: 60
    },
    h2: {
      ...rawTheme.h1.h2,
      ...fontHeader,
      fontSize: 48
    },
    h3: {
      ...rawTheme.h1.h3,
      ...fontHeader,
      fontSize: 42
    },
    h4: {
      ...rawTheme.h1.h4,
      ...fontHeader,
      fontSize: 36
    },
    h5: {
      ...rawTheme.h1.h5,
      fontSize: 20,
      fontWeight: rawTheme.h1.fontWeightLight
    },
    h6: {
      ...rawTheme.h1.h6,
      ...fontHeader,
      fontSize: 18
    },
    subtitle1: {
      ...rawTheme.h1.subtitle1,
      fontSize: 18
    },
    body1: {
      ...rawTheme.h1.body2,
      fontWeight: rawTheme.h1.fontWeightRegular,
      fontSize: 16
    },
    body2: {
      ...rawTheme.h1.body1,
      fontSize: 14
    }
  }
};

export default theme;
