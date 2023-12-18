import React, { useEffect } from "react";
import InventoryItems from "../../components/vendor/Inventory";
import InventoryAddButton from "../../components/vendor/InventoryAddButton";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Inventory = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo.role === "user") {
      navigate("/page-note-found");
    }
  }, [userInfo, navigate]);

  if (!userInfo) {
    // You can return a loading message or something else while userInfo is being checked
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="mt-20">
        <InventoryItems />
        <InventoryAddButton icon={"AiOutlinePlus"} />
      </div>
      <Toaster />
    </>
  );
};

export default Inventory;
