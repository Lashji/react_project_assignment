/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useNavigate,
  useParams,
  Link,
  useOutletContext,
} from "react-router-dom";
import {
  addCartItem,
  incrementCartItem,
} from "../redux/actionCreators/cartActions";

import { deleteProduct } from "../redux/actionCreators/productsActions";

const Product = ({ providedProduct }) => {
  const product = useOutletContext();
  console.log("Provided product", providedProduct, product);

  const params = useParams();
  let { productId } = params;

  if (!providedProduct) {
    providedProduct = product;
  }

  console.log("product:", providedProduct);

  if (!productId) productId = providedProduct.id;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = useSelector((state) => {
    return state.auth.role;
  });

  const cart = useSelector((state) => {
    return state.cart;
  });

  console.log("cart = ", cart, productId);
  const addToCart = () => {
    if (cart.find((i) => i.id === productId)) {
      console.log("increment");
      dispatch(incrementCartItem(productId));
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
            data-testid={`delete-button-${productId}`}
            onClick={(e) => dispatch(deleteProduct(providedProduct.id))}
          >
            Delete
          </button>
          <button
            data-testid={`modify-button-${productId}`}
            onClick={(e) => navigate(`${productId}/modify`)}
          >
            Modify
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button
            data-testid={`add-cart-button-${productId}`}
            onClick={addToCart}
          >
            Add to cart
          </button>
        </div>
      );
    }
  };

  return (
    <div data-testid="product-component">
      <div data-testid="name-header">
        <Link to={`./${productId}`}>{providedProduct.name}</Link>
      </div>
      {getImage()}
      <div data-testid="description-element">{providedProduct.description}</div>
      <div data-testid="price-element">{providedProduct.price}</div>
      {buttons()}
    </div>
  );
};

export default Product;
