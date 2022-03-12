/** @format */

import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

const Finder = ({ type, findHandler }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const { productId } = params;
  let val;
  let component;
  const state = useSelector((state) => state);

  useEffect(() => {
    switch (type) {
      case "product":
        val = state["products"].find((i) => i.id === productId);
        break;

      case "order":
        val = state["orders"].find((i) => i.id === productId);
        break;
      case "user":
        val = state["users"].find((i) => i.id === productId);
        break;

      default:
        break;
    }
    if (!val) {
      console.log("VAL ", val);
      dispatch(findHandler(productId));
    }

    if (val) {
      component = (
        <div data-testid={`${type}-found-component`}>
          <Outlet context={val} />
        </div>
      );
    } else {
      component = <div data-testid={`no-${type}-found-component`}></div>;
    }
  }, []);

  return <>{component}</>;
};

export default Finder;
