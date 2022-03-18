/** @format */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Notification from "./components/Notification";
import Register from "./components/Register";
import User from "./components/User";
import UserModifier from "./components/UserModifier";
import Users from "./components/Users";
import Auth from "./components/Auth";
import Order from "./components/Order";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Product from "./components/Product";
import ProductModifier from "./components/ProductModifier";
import Finder from "./components/Finder";
import { getOrder } from "./redux/actionCreators/ordersActions";
import { getProduct } from "./redux/actionCreators/productsActions";
import { getUser } from "./redux/actionCreators/usersActions";
import { initApp } from "./redux/actionCreators/appActions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initApp());
  }, []);

  return (
    <div className="app-container" data-testid="app-component">
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" index element={<Home />}></Route>
        <Route path="*" element={<NotFound />}></Route>

        <Route path="products" element={<Products />}>
          <Route element={<Auth authRoles={["admin"]} />}>
            <Route element={<Finder type="product" findHandler={getProduct} />}>
              <Route path=":productId" element={<Product />}>
                <Route
                  element={
                    <Finder type={"product"} findHandler={getProduct}></Finder>
                  }
                >
                  <Route path="modify" element={<ProductModifier />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route element={<Auth authRoles={["guest"]} />}>
          <Route path="register" element={<Register />}></Route>
        </Route>

        <Route element={<Auth authRoles={["guest"]} />}>
          <Route path="login" element={<Login />}></Route>
        </Route>

        <Route element={<Auth authRoles={["guest", "customer"]} />}>
          <Route path="cart" element={<Cart />} />
        </Route>

        <Route element={<Auth authRoles={["admin"]} />}>
          <Route path="users" element={<Users />}>
            <Route
              element={<Finder type={"user"} findHandler={getUser}></Finder>}
            >
              <Route path=":userId" element={<User />}>
                <Route element={<Finder type={"user"} findHandler={getUser} />}>
                  <Route path="modify" element={<UserModifier />}></Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route element={<Auth authRoles={["customer", "admin"]} />}>
          <Route path="orders" element={<Orders />}>
            <Route
              element={<Finder type={"order"} findHandler={getOrder}></Finder>}
            >
              <Route path=":orderId" element={<Order />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
