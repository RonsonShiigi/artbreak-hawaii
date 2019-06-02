import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const getProducts = () => {
  return dispatch => {
    axios
      .get("http://localhost:8080/products")
      .then(res => {
        dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "DISPLAY_ERROR" });
      });
  };
};

export const createProduct = product => {
  console.log("action:create product", product);
  return dispatch => {
    axios
      .post("http://localhost:8080/products", product)
      .then(res => {
        dispatch({ type: CREATE_PRODUCT, payload: res.data });
      })
      .catch(err => {
        console.log("error in creating a new product", err);
      });
  };
};
