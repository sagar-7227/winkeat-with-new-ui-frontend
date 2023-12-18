import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import React,{useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const PaymentSuccess = () => {
  const seachQuery = useSearchParams()[0];
  const referenceNum = seachQuery.get("razorpay_payment_id");

  console.log(referenceNum);

  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/auth/login");
    }
  }, [userInfo]);

  if (userInfo.role === "user") {
    return (
      <VStack h="95vh" className="space-y-3" justifyContent={"center"}>
        <Heading textTranform={"uppercase"}>Order Sucessfull</Heading>
        <Text>Thank you for your purchase</Text>
        <Text>Reference No. {referenceNum}</Text>
        <button
          type="button"
          class="btn border-2 border-[#ff742e] text-[#ff742e] hover:bg-[#ff742e] hover:text-[#fff] "
        >
          <Link to="/">Go to Dashboard</Link>
        </button>
      </VStack>
    );
  } else navigate("/page-not-found");
};

export default PaymentSuccess;
