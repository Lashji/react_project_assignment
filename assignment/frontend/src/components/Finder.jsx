/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

const Finder = ({ type, findHandler }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { productId, userId, orderId } = params;
  let val;
  let component;
  const state = useSelector((state) => state);
  let finderId;
  console.log("Finder fired");

  switch (type) {
    case "product":
      if (state.products.length > 0)
        val = state["products"].find((i) => i.id === productId);
      finderId = productId;
      break;

    case "order":
      if (state.orders.length > 0)
        val = state.orders.find((i) => i.id === orderId);
      finderId = orderId;
      break;
    case "user":
      if (state.users.length > 0)
        val = state.users.find((i) => i.id === userId);
      finderId = userId;
      break;

    default:
      break;
  }

  if (!val) {
    console.log("VAL not found, getting product", productId);
    dispatch(findHandler(finderId));
  }

  if (val) {
    console.log("Value found returning outlet", val);
    component = (
      <div data-testid={`${type}-found-component`}>
        <Outlet context={val} />
      </div>
    );
  } else {
    console.log("Finder unsuccessfull");
    component = (
      <div data-testid={`no-${type}-found-component`}>{type} not found.</div>
    );
  }

  return <>{component}</>;
};

export default Finder;
