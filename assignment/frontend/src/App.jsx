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
  return (
    <div className="app-container">
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>

        <Route element={<Auth authRoles={["guest", "customer"]} />}>
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route element={<Auth authRoles={[]} />}></Route>

        {/* <Route path="/products/:productId" element={<Auth />}>
          <Product />
        </Route>
        <Route path="/products/:productId/modify" element={<Auth />}>
          <ProductModifier />
        </Route>
        <Route path="/orders" element={<Auth />}>
          <Orders />
        </Route>
        <Route path="/orders/:orderId" element={<Auth />}>
          <Order />
        </Route>
        <Route path="/register" element={<Auth />}>
          <Register />
        </Route>
        <Route path="/login" element={<Auth />}>
          <Login />
        </Route>
        <Route path="/users" element={<Auth />}>
          <Users />
        </Route>
        <Route path="/users/:userId" element={<Auth />}>
          <User />
        </Route>
        <Route path="/users/:userId/modify" element={<Auth />}>
          <UserModifier />
        </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
