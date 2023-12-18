import React, { useEffect } from "react";
import PrevOrder_user from "../components/PrevOrder_user";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import NoPage from "./NoPage";
const AllPrevOrderUser = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo]);
  if (userInfo.role === "user") {
    return (
      <div className="mt-20">
        <PrevOrder_user />
        <Toaster />
      </div>
    );
  }
  return navigate("/no-page-found");
};

export default AllPrevOrderUser;
