/** @format */

import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
} from "../constants";

/**
 * Implement productsReducer that handles following cases:
 * 1) GET_PRODUCT: adds the single product to an empty state.
 * 2) GET_PRODUCTS: Adds the products to the empty state
 * 3) ADD_PRODUCT: Adds the product as the first entry of the state.
 * 4) UPDATE_PRODUCT: Updates the order in the state and places it as its last entry.
 * 5) DELETE_PRODUCT: Deletes the product from the array.
 * @param {Array} state old state of products.
 * @param {object} action the action that calls the reducer.
 * @returns {Array} new state for products
 */
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      console.log("add product", action.payload);
      return [action.payload, ...state];

    case DELETE_PRODUCT:
      return [...state].filter((i) => i.id !== action.payload.id);

    case GET_PRODUCT:
      return [action.payload];
    
    case GET_PRODUCTS:
      return action.payload;

    case UPDATE_PRODUCT:
      return [
        ...state.filter((i) => i.id !== action.payload.id),
        action.payload,
      ];
    default:
      return state;
  }
};

export default productsReducer;
