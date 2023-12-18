import React,{useEffect} from "react";
import PrevOrder from "../../components/vendor/PrevOrder";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PreviousOrders = () => {
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
    <div>
      <PrevOrder />
    </div>
  );
};

export default PreviousOrders;
