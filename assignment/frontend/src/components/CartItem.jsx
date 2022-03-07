/** @format */

import React from "react";
import { useDispatch } from "react-redux";
import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "../redux/actionCreators/cartActions";

const CartItem = ({ item }) => {
  return (
    <div data-testid={item.id}>
      <div data-testid="item-name">{item.name}</div>
      <div data-testid="item-price">{item.price}</div>
      <div data-testid="item-amount">{item.amount}</div>
      <div className="cart-item-buttons">
        <button data-testid={`plus-btn-${item.id}`}>+</button>
        <button data-testid={`minus-btn-${item.id}`}>-</button>
      </div>
    </div>
  );
};

export default CartItem;
