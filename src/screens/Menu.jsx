import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import MenuItems from "../components/MenuItems";
import NoPage from "./NoPage";
const Menu = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo]);
  const params = useParams();
  console.log(params.id);

  if (userInfo.role === "user") {
    return (
      <div className="mt-20">
        {/* <div className="p-4 mt-3 sm:ml-64"> */}
        <MenuItems id={params.id} />
        {/* </div> */}
        <Toaster />
      </div>
    );
  }
  return navigate("/no-page-found");
};

export default Menu;
