import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { BASE_URL } from "../helper";
import Loader from "../components/Loader";
const VerifyUser = () => {
  const [loading, setLoading] = useState();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/v1/verifyemail`, { token });
      setVerified(true);
      setLoading(false);
    } catch (error) {
      setError(true);
      console.log(error.reponse.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  if (loading === true) {
    return <Loader loading={loading} />;
  }

  return (
    <VStack h="95vh" className="space-y-3" justifyContent={"center"}>
      <h1 className="text-4xl">Verify Email</h1>
      {verified && (
        <>
          <Heading textTranform={"uppercase"}>Email Verified</Heading>
          <Text>Token: {token}</Text>
          <button
            type="button"
            class="btn border-2 border-[#ff742e] text-[#ff742e] hover:bg-[#ff742e] hover:text-[#fff] "
          >
            <Link to="/auth/login">Login</Link>
          </button>
        </>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error</h2>
        </div>
      )}
    </VStack>
  );
};

export default VerifyUser;
