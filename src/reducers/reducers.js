import { GET_ALL_PRODUCTS } from "../actions/actions.js";
import { CREATE_PRODUCT } from "../actions/actions";

const productReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.payload;
    case CREATE_PRODUCT:
      return action.payload;
    default:
      return state;
  }
};

export default productReducer;
