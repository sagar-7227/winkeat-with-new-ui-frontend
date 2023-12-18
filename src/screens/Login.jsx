import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { BASE_URL } from "../helper";
import Loader from "../components/Loader";
const Login = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "user") {
        navigate("/");
      } else if (userInfo.role === "vendor") {
        navigate("/dashboard");
      }
    }
  }, [userInfo]);

  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const submitHandler = async (e) => {
    // Use async to handle asynchronous operations
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        // Check if the response status is 200 (OK)
        const res = await response.json(); // Parse the response JSON
        localStorage.setItem("token", res.token); // Assuming the token is returned as data.token
        toast.success("Logged in Successfully");
        dispatch(setCredentials({ ...res }));
        if (res.user.role === "user") {
          navigate("/");
          setLoading(false);
        } else if (res.user.role === "vendor") {
          navigate("/dashboard");
          setLoading(false);
        }
      } else {
        if (response.status === 401) {
          toast.error("Authentication failed. Please check your credentials.");
          setLoading(false);
        } else {
          toast.error(
            "An error occurred while logging in. Please try again later."
          );
          setLoading(false);
        }
      }
    } catch (err) {
      // Handle any network or other errors that may occur during the fetch
      toast.error(
        "An error occurred while logging in. Please try again later."
      );
      console.error(err); // Log the error to the console for debugging
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
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Email Address"
                    required
                    value={email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    value={password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    to="/auth/password/forgot"
                    className="text-sm font-medium text-primary-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  // onClick={checktoast}
                  onClick={submitHandler}
                  className="w-full text-white bg-[#ff742e] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign in
                </button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/auth/signup"
                    className="font-medium text-[#ff742e] hover:underline"
                  >
                    Sign up
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

export default Login;
