import React, { useEffect } from "react";
import CartItem from "../components/Cart";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import NoPage from "./NoPage";
const Cart = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo]);
  if (userInfo.role === "user") {
    return (
      <>
        <CartItem />
        <Toaster />
      </>
    );
  }
  return navigate("/no-page-found");
};

export default Cart;
