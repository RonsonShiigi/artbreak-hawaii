import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export const getProducts = () => {
  return dispatch => {
    axios
      .get("http://localhost:8080/products")
      .then(res => {
        console.log("res", res);
        dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "DISPLAY_ERROR" });
      });
  };
};
