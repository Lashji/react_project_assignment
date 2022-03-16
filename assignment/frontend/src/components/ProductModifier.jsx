/** @format */

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateProduct } from "../redux/actionCreators/productsActions";
import { useNavigate, useParams } from "react-router-dom";

const ProductModifier = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productId } = useParams();

  const product = useSelector((state) => {
    return state.products.find((i) => i.id === productId);
  });

  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateProduct({ id: productId, name, price, image, description }));
    navigate("/products");
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      data-testid="product-modifier-component"
    >
      <h1>Edit product:</h1>

      <input value={product.id} disabled data-testid="id-input" type="text" />
      <input
        data-testid="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        data-testid="price-input"
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
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
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit" data-testid="update-button">
        Update
      </button>
      <button
        onClick={(e) => navigate("/products")}
        data-testid="cancel-button"
        type="button"
      >
        Cancel
      </button>
    </form>
  );
};

export default ProductModifier;
