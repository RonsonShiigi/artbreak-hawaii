import axios from "axios";

export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const CREATE_PRODUCT = "CREATE_PRODUCT";

export const getProducts = () => {
  return dispatch => {
    axios
      .get("http://localhost:8080/products")
      .then(res => {
<<<<<<< HEAD
=======
        // console.log("res", res);
>>>>>>> 94e0950a3c036ff4e42e342801df0a489ee3d239
        dispatch({ type: GET_ALL_PRODUCTS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: "DISPLAY_ERROR" });
      });
  };
};

export const createProduct = product => {
  // console.log("action:create product", product);
  return dispatch => {
    axios
      .post("http://localhost:8080/products", product)
      .then(res => {
<<<<<<< HEAD
=======
        // console.log("response", res.data);
>>>>>>> 94e0950a3c036ff4e42e342801df0a489ee3d239
        dispatch({ type: CREATE_PRODUCT, payload: res.data });
      })
      .catch(err => {
        console.log("error in creating a new product", err);
      });
  };
};
