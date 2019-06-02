import { GET_ALL_PRODUCTS } from "../actions/actions.js";
import { CREATE_PRODUCT } from "../actions/actions";

const productReducer = (state = [], action) => {
  // console.log("REDUCER ACTION: ", action);
  // console.log("CURRENT STATE ", state);
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      // console.log("action.payload in GET_ALL_PRODUCTS reducer", action.payload);
      return action.payload;
    case CREATE_PRODUCT:
      console.log("reducer says creating new product", action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
