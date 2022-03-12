/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actionCreators/productsActions";
import Product from "./Product";
import ProductAdder from "./ProductAdder";

const Products = () => {
  const [adderOpen, setAdderOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const products = useSelector((state) => {
    return state.products;
  });

  const role = useSelector((state) => {
    return state.auth.user.role;
  });

  let roleBasedComponent = () => {
    if (role === "admin") {
      return (
        <div>
          <button data-testid="open-adder-button">
            {adderOpen ? "Close" : "Open"}
          </button>
          <br />
          {adderOpen ? <ProductAdder /> : <></>}
        </div>
      );
    } else {
      return (
        <ol data-testid="products-container">
          {products.map((i) => {
            return <Product providedProduct={i} key={`product-${i.id}`} />;
          })}
        </ol>
      );
    }
  };

  console.log("products", products);

  return <div data-testid="products-component">{roleBasedComponent()}</div>;
};

export default Products;
