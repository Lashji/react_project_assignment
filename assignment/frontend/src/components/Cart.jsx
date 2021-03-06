/** @format */

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createNotification } from "../redux/actionCreators/notificationsActions";
import { addOrder } from "../redux/actionCreators/ordersActions";
import CartItem from "./CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emptyCartElement = <div data-testid="empty-cart">Cart is empty!</div>;
  const { role } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);

  const handleOrder = () => {
    if (role === "guest") {
      dispatch(
        createNotification({
          message: "Authentication required",
          isSuccess: false,
        })
      );

      navigate("../login");
    } else {
      dispatch(addOrder({ items: cart }));
    }
  };

  let content = <></>;
  if (cart.length > 0) {
    const cartItems = cart.map((i) => {
      return <CartItem key={`cart-item-${i.product.id}`} item={i} />;
    });
    content = (
      <>
        <ul data-testid="cart-item-container">{cartItems}</ul>
        <button data-testid="order-button" onClick={(e) => handleOrder()}>
          Order
        </button>
      </>
    );
  } else {
    content = emptyCartElement;
  }

  return (
    <div data-testid="cart-component">
      <h2>Cart</h2>
      {content}
    </div>
  );
};

export default Cart;
