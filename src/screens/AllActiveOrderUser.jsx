import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ActiveOrder_user from "../components/ActiveOrder_user";
import NoPage from "./NoPage";

const AllActiveOrderUser = () => {
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
        <ActiveOrder_user />
      </div>
    );
  }
  return navigate("/no-page-found");
};

export default AllActiveOrderUser;
