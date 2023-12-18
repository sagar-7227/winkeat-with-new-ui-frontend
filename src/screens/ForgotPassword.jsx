import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../helper";
import Loader from "../components/Loader";

const ForgotPassword = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }), // Pass the email as an object
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        setLoading(false);
      } else {
        // Handle non-successful responses
        const errorData = await response.json();
        toast.error(errorData.error);
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      // Handle any network or other errors
      toast.error("An error occurred while processing your request.");
      setLoading(false);
    }
  };

  if (loading === true) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <section className="sm:bg-gray-50 ">
        <div className="flex flex-col items-center justify-center sm:px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white sm:rounded-lg sm:shadow md:mt-0 sm:max-w-md xl:p-0 text-center">
            <div className="p-6 space-y-16 mt-[100px] sm:mt-[0px]   sm:space-y-4 md:space-y-6 sm:p-8">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl  font-semibold text-gray-900"
              >
                <img
                  className="w-[150px] h-[60px]  mx-auto"
                  src="/logo.png"
                  alt="logo"
                />
              </a>
              <h1 className="title font-['josefin-sans'] text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Find your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button
                  // onClick={checktoast}
                  onClick={submitHandler}
                  className="w-full text-white bg-[#ff742e] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Send Email
                </button>
                <p className="text-sm font-light text-gray-500">
                  Allready have an account?{" "}
                  <Link
                    to="/auth/login"
                    className="font-medium text-[#ff742e] hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default ForgotPassword;
