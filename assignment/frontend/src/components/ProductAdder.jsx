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

    dispatch(addProduct({ name, price, image, description }));
    openHandler(false);
  };

  if (!open) return <></>;
  return (
    <form
      onSubmit={(e) => handleAddProduct(e)}
      data-testid="product-adder-component"
    >
      <label htmlFor="">Name</label>
      <input
        data-testid="name-input"
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label htmlFor="">price</label>
      <input
        data-testid="price-input"
        type="text"
        required
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />
      <label htmlFor="">image</label>
      <input
        data-testid="image-input"
        type="text"
        value={image}
        pattern="(([\w]+:)?//)?(([\d\w]|%[a-fA-f\d]{2,2})+(:([\d\w]|%[a-fA-f\d]{2,2})+)?@)?([\d\w][-\d\w]{0,253}[\d\w]\.)+[\w]{2,63}(:[\d]+)?(/([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)*(\?(&?([-+_~.\d\w]|%[a-fA-f\d]{2,2})=?)*)?(#([-+_~.\d\w]|%[a-fA-f\d]{2,2})*)?"
        onChange={(e) => setImage(e.target.value)}
        required
      />
      <br />
      <label htmlFor="">description</label>
      <input
        data-testid="description-input"
        type="text"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <button type="submit" data-testid="add-button">
        Add product
      </button>
      <button data-testid="cancel-button" onClick={(e) => openHandler(e)}>
        Cancel
      </button>
    </form>
  );
};

export default ProductAdder;
