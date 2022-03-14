/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../redux/actionCreators/ordersActions";
import Order from "./Order";

const Orders = () => {
  const dispatch = useDispatch();
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

  return (
    <div data-testid="orders-component">
      <ol>
        {orders?.map((i) => (
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
