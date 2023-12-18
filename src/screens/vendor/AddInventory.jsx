import React, { useEffect } from "react";
import InventoryForm from "../../components/vendor/InventoryForm";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddInventory = () => {
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
    <div className="mt-20">
      <InventoryForm />
    </div>
  );
};

export default AddInventory;
