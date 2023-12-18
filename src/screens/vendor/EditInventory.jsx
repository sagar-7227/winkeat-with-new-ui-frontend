import React, { useEffect } from "react";
import InventoryEditForm from "../../components/vendor/InventoryEditForm";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const EditInventory = ({}) => {
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
  const params = useParams();

  return (
    <div className="mt-20">
      <InventoryEditForm id={params.id} />
    </div>
  );
};

export default EditInventory;
