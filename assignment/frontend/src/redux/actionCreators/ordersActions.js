/** @format */

// ORDER ACTION CREATORS

import {
  NEW_NOTIFICATION,
  GET_ORDERS,
  ADD_ORDER,
  GET_ORDER,
} from "../constants";
import { emptyCart } from "./cartActions";
import { createNotification } from "./notificationsActions";
import axios from "axios";

const orderMsg = {
  newOrder: "New order made.",
};
/**
 * @description Action creator for getting a single order. Dispatches action with type GET_ORDER and payload of the fetched order if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {string} orderId -  The id of the order to get
 * @returns {Function} - Thunk -> action
 */
export const getOrder = (orderId) => {
  return async (dispatch) => {
   await axios
      .get(`/api/orders/${orderId}`)
      .then((res) => {
        dispatch({
          type: GET_ORDER,
          payload: res.data,
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
 * @description Action creator for getting all orders. Dispatches action with type GET_ORDERS and payload of the fetched orders if succesfull.
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @returns {Function} - Thunk -> action
 */
export const getOrders = () => {
  return async (dispatch) => {
    await axios
      .get(`/api/orders/`)
      .then((res) => {
        dispatch({
          type: GET_ORDERS,
          payload: res.data,
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
 * @description Action creator for adding a new order. Dispatches actions:
 * - ADD_ORDER-type with payload that has the new order
 * - EMPTY_CART-type with no payload
 * - NEW_NOTIFICATION with orderMsg.newOrder in the payload
 * If the response is not ok, it only dispatches a NEW_NOTIFICATION-type action to the frontends notification state along with the error message from db as an unsuccessfull message.
 * @param {object} newOrder -  The new order to post
 * @returns {Function} - Thunk -> action
 */
export const addOrder = (newOrder) => {
  console.log("New order", newOrder);

  return async (dispatch) => {

    console.log("new  oRder", newOrder);


    const order = {
      items: newOrder.items.map(i => {
        console.log(i);
        
        delete i.product.image

        return i

      })
    }

    await axios
      .post(`/api/orders/`, order, {
        headers: {
          "Content-Type": "application/json",
          "Accept": 'application/json'
        },
      
      })
      .then((res) => {

        dispatch(emptyCart());

        dispatch({
          type: ADD_ORDER,
          payload: res.data,
        });

        dispatch({
          type: NEW_NOTIFICATION,
          payload: { message: orderMsg.newOrder, isSuccess: true },
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
