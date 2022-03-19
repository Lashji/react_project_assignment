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
    const { product, quantity } = i;
    return (
      <li key={`orderItem-${product.id}`} data-testid="order-listitem">
        <h2 data-testid="name-heading">{product.name}</h2>
        <div data-testid="price-element">{product.price}</div>
        <div data-testid="description-element">{product.description}</div>
        <h2 data-testid="quantity-element">{quantity}</h2>
      </li>
    );
  });
  let inspectLink = (
    <Link data-testid="inspect-link" to={`${providedOrder.id}`}>
      Inspect
    </Link>
  );

  if (orderId) inspectLink = <></>;
  return (
    <div data-testid="order-component">
      <div data-testid="orderId-heading">{orderId}</div>
      <div data-testid="customerId-heading">{providedOrder.customerId}</div>
      {inspectLink}
      <ol data-testid="order-list">{orderItems}</ol>
    </div>
  );
};

export default Order;
