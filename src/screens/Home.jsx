import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Vendors from "../components/Vendors";
import { emptyCart } from "../slices/cartSlice";
import NoPage from "./NoPage";

const Home = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "vendor") {
        navigate("/dashboard");
      }
    } else if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    // You can return a loading message or something else while userInfo is being checked
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-20">
      <Vendors />
      <Toaster />
    </div>
  );
};

export default Home;
