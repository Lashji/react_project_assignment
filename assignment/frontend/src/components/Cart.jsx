/** @format */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNotification } from "../redux/actionCreators/notificationsActions";
import { addOrder } from "../redux/actionCreators/ordersActions";
import CartItem from "./CartItem";

const Cart = () => {
  const emptyCartElement = <div data-testid="empty-cart"></div>;

  const cart = useSelector((state) => state.cart);
  let content = <></>;
  if (cart.length > 0) {
    const cartItems = cart.map((i) => {
      return <CartItem key={`cart-item-${i.name}`} item={i} />;
    });
    content = <ul data-testid="cart-item-container">{cartItems}</ul>;
  } else {
    content = emptyCartElement;
  }

  return <div data-testid="cart-component">{content}</div>;
};

export default Cart;
