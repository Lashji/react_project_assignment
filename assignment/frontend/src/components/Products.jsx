/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actionCreators/productsActions";
import Product from "./Product";
import ProductAdder from "./ProductAdder";

const Products = () => {
  const [adderOpen, setAdderOpen] = useState(false);
  const dispatch = useDispatch();

  const products = useSelector((state) => {
    return state.products;
  });

  useEffect(() => {
    if (products.length === 0) dispatch(getProducts());
  }, []);

  const role = useSelector((state) => {
    return state.auth.role;
  });

  let roleBasedComponent = () => {
    if (role === "admin") {
      return (
        <div>
          <button
            data-testid="open-adder-button"
            onClick={(e) => setAdderOpen(!adderOpen)}
          >
            {adderOpen ? "Close" : "Open"}
          </button>
          <br />
          {<ProductAdder open={adderOpen} openHandler={setAdderOpen} />}
        </div>
      );
    } else {
      return <></>;
    }
  };

  const productsList = (
    <ol data-testid="products-container">
      {products.map((i) => {
        return <Product providedProduct={i} key={`product-${i.id}`} />;
      })}
    </ol>
  );

  console.log("products", products);

  return (
    <div data-testid="products-component">
      {roleBasedComponent()}
      {productsList}
    </div>
  );
};

export default Products;
