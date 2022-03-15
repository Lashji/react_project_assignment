/** @format */

// PRODUCT ACTION CREATORS

import axios from "axios";

import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  NEW_NOTIFICATION,
  UPDATE_PRODUCT,
} from "../constants";

import { createNotification } from "./notificationsActions";

export const productMsg = {
  added: "Product added.",
  updated: "Product updated.",
  deleted: (product) => {
    return `${product.name} deleted successfully`;
  },
};

/**
 * @description Asynchronous Action creator for getting a single product. Dispatches an action with type GET_PRODUCT through thunk if succesful or NEW_NOTIFICATION-type and error message from db in the payload
 * @param {String} productId - The id of the product to get
 * @return {Function} - Thunk -> action
 */
export const getProduct = (productId) => {
  return async function (dispatch) {
    await axios
      .get(`/api/products/${productId}`)
      .then((res) => {
        const { data } = res;

        dispatch({
          type: GET_PRODUCT,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch(
          createNotification({
            message: error.response.data.error,
            isSuccess: false,
          })
        );
      });
  };
};

/**
 * @description Asynchronous Action creator that dispatches all the products it receives from DB to the frontends redux-stores product-state. Dispatches GET_PRODUCTS with products as payload if succesfull, or NEW_NOTIFICATION-type and error message from db in the payload
 * @return {Function} - Thunk -> action
 */
export const getProducts = () => {
  return async (dispatch) => {
    await axios
      .get(`/api/products/`)
      .then((res) => {
        const { data } = res;

        dispatch({
          type: GET_PRODUCTS,
          payload: data,
        });
      })
      .catch((error) => {
        dispatch(
          createNotification({
            message: error.response.data.error,
            isSuccess: false,
          })
        );
      });
  };
};

/**
 * @description Asynchronous Action creator that adds a new product to the DB, then dispatches an ADD_PRODUCT-type action with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.added as a successful message. If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message. If the error itself is an object, then it should pass whatever is inside the object.
 *  * @param {Object} productToAdd - The product to add
 * @return {Function} - Thunk -> action
 */
export const addProduct = (productToAdd) => {
  return async (dispatch) => {
    await axios
      .post("/api/products/", productToAdd)
      .then((res) => {
        dispatch({
          type: ADD_PRODUCT,
          payload: res.data,
        });

        dispatch({
          type: NEW_NOTIFICATION,
          payload: { message: productMsg.added, isSuccess: true },
        });
      })
      .catch((error) => {
        if (typeof error.response.data.error === "object") {
          dispatch(
            createNotification({
              message: error.response.data.error.image,
              isSuccess: false,
            })
          );
        } else {
          dispatch(
            createNotification({
              message: error.response.data.error,
              isSuccess: false,
            })
          );
        }
      });
  };
};

/**
 * @description Asynchronous Action creator that updates an existing product in the DB, then dispatches an UPDATE_PRODUCT-type action to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.updated as a successful message. If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {Object} productToUpdate - The product with updated values
 * @return {Function} - Thunk -> action
 */
export const updateProduct = (productToUpdate) => {
  return async (dispatch) => {
    await axios
      .put(`/api/products/${productToUpdate.id}`, productToUpdate, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({
          type: UPDATE_PRODUCT,
          payload: res.data,
        });

        dispatch({
          type: NEW_NOTIFICATION,
          payload: { message: productMsg.updated, isSuccess: true },
        });
      })
      .catch((error) => {
        dispatch(
          createNotification({
            message: error.response.data.error,
            isSuccess: false,
          })
        );
      });
  };
};

/**
 * @description Asynchronous Action creator that deletes existing product in the DB, then dispatches a DELETE_PRODUCT-type action along with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION-type action to the frontends notification-state with the productMsg.deleted(product) as a successful message. If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {String} productId - The id of the product to delete
 * @return {Function} redux thunk -> action
 */
export const deleteProduct = (productId) => {
  return async (dispatch) => {
    await axios
      .delete(`/api/products/${productId}`)
      .then((res) => {
        dispatch({
          type: DELETE_PRODUCT,
          payload: res.data,
        });

        dispatch({
          type: NEW_NOTIFICATION,
          payload: { message: productMsg.deleted(res.data), isSuccess: true },
        });
      })
      .catch((error) => {
        dispatch(
          createNotification({
            message: error.response.data.error,
            isSuccess: false,
          })
        );
      });
  };
};
