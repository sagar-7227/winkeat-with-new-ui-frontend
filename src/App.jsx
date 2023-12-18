import React from "react";
import "./App.scss";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Layout from "./Layout";
import Menu from "./screens/Menu";
import Cart from "./screens/Cart";
import NoPage from "./screens/NoPage";
import Dashboard from "./screens/vendor/Dashboard";
import Inventory from "./screens/vendor/Inventory";
import EditInventory from "./screens/vendor/EditInventory";
import Profile from "./screens/profile";
import PaymentSuccess from "./screens/PaymentSuccess";
import Register from "./screens/Register";
import VerifyUser from "./screens/VerifyUser";
import PreviousOrders from "./screens/vendor/PreviousOrders";
import ActiveOrders from "./screens/vendor/ActiveOrders";
import AllActiveOrderUser from "./screens/AllActiveOrderUser";
import AllPrevOrderUser from "./screens/AllPrevOrderUser";
import AddInventory from "./screens/vendor/AddInventory";
import ForgotPassword from "./screens/ForgotPassword";
import ResetPassword from "./screens/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Register />} />
          <Route path="/auth/verify-email" element={<VerifyUser />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/password/forgot" element={<ForgotPassword />} />
          <Route path="/vendor/:id/menu" element={<Menu />} />
          <Route path="/vendor/:id/cart" element={<Cart />} />
          <Route path="user/active-orders" element={<AllActiveOrderUser />} />
          <Route path="user/previous-orders" element={<AllPrevOrderUser />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory/" element={<Inventory />} />
          <Route path="/inventory/new" element={<AddInventory />} />
          <Route path="/inventory/:id/edit" element={<EditInventory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/previous-orders" element={<PreviousOrders />} />
          <Route path="/active-orders" element={<ActiveOrders />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
