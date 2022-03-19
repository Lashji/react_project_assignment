/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actionCreators/ordersActions";
import Order from "./Order";

const Orders = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const orders = useSelector((state) => {
    return state.orders;
  });

  useEffect(() => {
    if (orders.length === 0) {
      dispatch(getOrders());
    }
  }, []);

  if (orders.length === 0) {
    return <div data-testid="no-order-component"></div>;
  }

  const filteredOrders = orders.filter((i) => {
    if (auth.role === "customer") {
      console.log("AUth is customer");
      return i.customerId === auth.id;
    } else if (auth.role === "admin") {
      console.log("AUth is admin");

      return true;
    } else {
      console.log("AUth is else");

      return false;
    }
  });

  return (
    <div data-testid="orders-component">
      <ol data-testid="orders-container">
        {filteredOrders?.map((i) => (
          <Order
            providedOrder={i}
            key={`order-${i.id}`}
            data-testid="order-component"
          ></Order>
        ))}
      </ol>
    </div>
  );
};

export default Orders;
