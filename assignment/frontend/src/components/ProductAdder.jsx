/** @format */

import { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addProduct } from "../redux/actionCreators/productsActions";

const ProductAdder = ({ open, openHandler }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const handleAddProduct = (e) => {
    e.preventDefault();

    dispatch(addProduct({}));
    openHandler(false);
  };

  if (!open) return <></>;
  return (
    <form data-testid="product-adder-component">
      <input
        data-testid="name-input"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        data-testid="price-input"
        type="text"
        required
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        data-testid="image-input"
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <input
        data-testid="description-input"
        type="text"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button data-testid="add-button" onClick={(e) => handleAddProduct(e)}>
        Add product
      </button>
      <button data-testid="cancel-button" onClick={(e) => openHandler(e)}>
        Cancel
      </button>
    </form>
  );
};

export default ProductAdder;
