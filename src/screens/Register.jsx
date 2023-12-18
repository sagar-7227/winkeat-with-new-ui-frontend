import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { BASE_URL } from "../helper";
import Loader from "../components/Loader";

const Register = () => {
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
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [image, setImage] = useState(null);

  const { name, email, phone, password } = formData;

  console.log(import.meta.env.VITE_BASE_URL);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    try {
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("image", image);

      console.log(...formData);
      const response = await fetch(`${BASE_URL}/api/v1/register`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          toast.success(
            "User registered Successfully Please check your email for verification"
          );
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
          });
          setImage(null);
          console.log(data);
          navigate("/auth/login");
          setLoading(false);
        } else {
          toast.error(data.message);
          setLoading(false);
        }
      } else {
        toast.error("The user is already registered");
        console.log(response);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <Loader loading={loading} />}
      <section className="sm:bg-gray-50 ">
        <div className="flex flex-col items-center justify-center sm:px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white sm:rounded-lg sm:shadow md:mt-0 sm:max-w-md xl:p-0 text-center">
            <div className="p-6 space-y-8 mt-[50px] sm:mt-[0px]   sm:space-y-4 md:space-y-6 sm:p-8">
              <a
                href="#"
                className="flex items-center mb-6 text-2xl  font-semibold text-gray-900"
              >
                <img
                  className=" w-[150px] h-[60px]  mx-auto"
                  src="/logo.png"
                  alt="logo"
                />
              </a>
              <h1 className="title font-['josefin-sans'] text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign Up to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-23 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {image ? (
                      <img
                        src={window.URL.createObjectURL(image)}
                        alt="profile"
                        className="ml-auto mr-auto h-[150px]"
                      />
                    ) : (
                      <div class="flex flex-col h-[120px] items-center justify-center">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-center text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}

                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                </div>
                <div>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Full Name"
                    required
                    value={name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
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
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Phone Number"
                    required
                    value={phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
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

                <button
                  // onClick={checktoast}
                  onClick={submitHandler}
                  className="w-full text-white bg-[#ff742e] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Sign up
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account yet?{" "}
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

export default Register;
