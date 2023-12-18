import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../helper";
import Loader from "../components/Loader";

const ResetPassword = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seachQuery = useSearchParams()[0];
  const token = seachQuery.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Assuming you have the "password" and "confirmPassword" variables defined earlier

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return; // Exit the function early if passwords don't match
      setLoading(false);
    }

    try {
      const reqbody = JSON.stringify({ token, password, confirmPassword });

      const response = await fetch(`${BASE_URL}/api/v1/password/reset`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: reqbody,
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Your password has been successfully changed");
        setLoading(false);
        navigate("/auth/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
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
                Reset your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  // onClick={checktoast}
                  onClick={submitHandler}
                  className="w-full text-white bg-[#ff742e] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Toaster />
    </>
  );
};

export default ResetPassword;
