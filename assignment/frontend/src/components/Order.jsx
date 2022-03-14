/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const Order = ({ providedOrder }) => {
  const { orderId } = useParams();

  const order = useSelector((state) => {
    return state.orders.find((i) => i.id === orderId);
  });

  if (!providedOrder) {
    providedOrder = order;
  }

  const orderItems = providedOrder.items.map((i) => {
    return (
      <li data-testid="order-listitem">
        <h4 data-testid="name-heading">{i.name}</h4>
        <div data-testid="price-element">{i.price}</div>
        <div data-testid="description-element">{i.description}</div>
        <div data-testid="quantity-element">{i.quantity}</div>
      </li>
    );
  });

  return (
    <div data-testid="order-component">
      <div data-testid="order-id">{orderId}</div>
      <div data-testid="order-customer-id">{providedOrder.customerId}</div>
      <Link data-testid="inspect-link" to={`./orders/${orderId}`} />
      <ol>{orderItems}</ol>
    </div>
  );
};

export default Order;
