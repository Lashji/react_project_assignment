/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "../redux/actionCreators/cartActions";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const { product, quantity } = item;
  return (
    <div data-testid="cart-item-component">
      <div data-testid="item-name">{product.name}</div>
      <div data-testid="item-price">{product.price}</div>
      <div data-testid="item-amount">quantity: {quantity}</div>
      <div className="cart-item-buttons">
        <button
          data-testid={`plus-btn-${product.id}`}
          onClick={(e) => dispatch(incrementCartItem(product.id))}
        >
          +
        </button>
        <button
          data-testid={`minus-btn-${product.id}`}
          onClick={(e) =>
            quantity === 1
              ? dispatch(removeCartItem(product))
              : dispatch(decrementCartItem(product.id))
          }
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CartItem;
