/** @format */

// CART ACTION CREATORS
import {
  ADD_CART_ITEM,
  EMPTY_CART,
  INIT_CART,
  NEW_NOTIFICATION,
  REMOVE_CART_ITEM,
  UPDATE_CART_ITEM_AMOUNT,
} from "../constants";

const cartMsg = {
  add: "New cart item added.",
  update: "Cart item amount updated.",
};
/**
 * @description Action creator that initiates the cart after page is refreshed.  Dispatches an INIT_CART-type action along with pre-existing cart-items stored locally as payload to the frontends redux-stores product-state.
 * @return {Object} action
 */
export const initCart = () => {
  return function (dispatch, getState) {
    const localCart = JSON.parse(window.localStorage.getItem("cart"));

    dispatch({
      type: INIT_CART,
      payload: localCart,
    });
  };
};

/**
 * @description Action creator that adds a new cart item to local storage.  Dispatches an ADD_CART_ITEM-type action along with product as payload to the frontends redux-stores product-state, as well as a NEW_NOTIFICATION action to the frontends notification-state with a succesful message using cartMsg.add
 * @param {String} product - The product item to add
 * @return {Function} thunk
 */
export const addCartItem = (product) => {
  return function (dispatch, getState) {
    const cart = JSON.parse(window.localStorage.getItem("cart"));

    cart.push(product);

    window.localStorage.setItem("cart", JSON.stringify(cart));

    dispatch({
      type: ADD_CART_ITEM,
      payload: product,
    });

    dispatch({
      type: NEW_NOTIFICATION,
      payload: cartMsg.add,
    });
  };
};

/**
 * @description Action creator that removes a cart item from local storage.  Dispatches a REMOVE_CART_ITEM-type action along with product as payload to the frontends redux-stores product-state.
 * @param {String} product - The product item to remove from cart
 * @return {Object} Action
 */
export const removeCartItem = (product) => {
  return function (dispatch) {
    const cart = JSON.parse(window.localStorage.getItem("cart"));

    cart.remove(product);

    window.localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: product,
    });
  };
};

/**
 * @description Thunk action creator that increments a cart items quantity in local store.  Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the update details { productId, amount: 1 } as payload to the frontends redux-stores product-state. Also sends NEW_NOTIFICATION-type action with payload of a message informing the items amount is updated (use cartMsg.update).
 * @param {String} productId - The cart item id to increment
 * @return {Function} thunk
 */
export const incrementCartItem = (productId) => {
  return function (dispatch) {
    const cart = JSON.parse(window.localStorage.getItem("cart"));

    cart.find((i) => i.id === productId).quantity++;

    window.localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: UPDATE_CART_ITEM_AMOUNT,
      payload: { productId, amout: 1 },
    });
  };
};

/**
 * @description Thunk action creator that decrements (reduces) a cart items quantity in local store.  Dispatches a UPDATE_CART_ITEM_AMOUNT-type action along with the update details  { productId, amount: -1 } as payload to the frontends redux-stores product-state. Also sends NEW_NOTIFICATION-type action with payload of a message informing the items amount is updated (use cartMsg.update)
 *
 * @param {String} productId - The cart item id to decrement
 * @return {Function} thunk
 */
export const decrementCartItem = (productId) => {
  return function (dispatch) {
    const cart = JSON.parse(window.localStorage.getItem("cart"));

    cart.find((i) => i.id === productId).quantity--;

    window.localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({
      type: UPDATE_CART_ITEM_AMOUNT,
      payload: {
        productId,
        amount: -1,
      },
    });
  };
};

/**
 * @description An action creator which removes the entire cart-item from local store. Returns an action with EMPTY_CART-type to remove cart all items.
 * @returns {Object} the action
 */
export const emptyCart = () => {
  window.localStorage.setItem("cart", JSON.stringify([]));

  return {
    type: EMPTY_CART,
  };
};
