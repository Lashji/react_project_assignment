/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCartItem,
  incrementCartItem,
} from "../redux/actionCreators/cartActions";

import { deleteProduct } from "../redux/actionCreators/productsActions";

const Product = ({ providedProduct }) => {
  // console.log("product", providedProduct);

  let { id } = useParams();

  if (!id) id = providedProduct.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => {
    return state.auth.role;
  });

  const cart = useSelector((state) => {
    return state.cart;
  });

  console.log("cart = ", cart, id);
  const addToCart = () => {
    if (cart.find((i) => i.id === id)) {
      console.log("increment");
      dispatch(incrementCartItem(id));
    } else {
      console.log("add");
      dispatch(addCartItem(providedProduct));
    }
  };

  const getImage = () => {
    if (providedProduct.image) {
      return (
        <img
          alt="product"
          height={100}
          widt={100}
          src={providedProduct.image}
        />
      );
    }
    return <></>;
  };

  const buttons = () => {
    if (role === "admin") {
      return (
        <div>
          <button
            data-testid={`delete-button-${id}`}
            onClick={(e) => dispatch(deleteProduct(providedProduct))}
          >
            Delete
          </button>
          <button
            data-testid={`modify-button-${id}`}
            onClick={navigate(`${id}/modify`)}
          >
            Modify
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button data-testid={`add-cart-button-${id}`} onClick={addToCart}>
            Add to cart
          </button>
        </div>
      );
    }
  };

  return (
    <div data-testid="product-component">
      <div data-testid="name-header">{providedProduct.name}</div>
      {getImage()}
      <div data-testid="description-element">{providedProduct.description}</div>
      <div data-testid="price-element">{providedProduct.price}</div>
      {buttons()}
    </div>
  );
};

export default Product;
