import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { toast, Toaster } from "react-hot-toast";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import { FaUserAlt, FaUserCircle, FaSignInAlt } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BiFoodMenu, BiSearch } from "react-icons/bi";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { GiNotebook } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi";
import { setSearchKeyword } from "../slices/searchSlice";
import { BASE_URL } from "../helper";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname;
  const userInfo = useSelector((state) => state.auth.userInfo);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const vendorId = useSelector((state) => state.vendor.vendorId);

  const pathmenu = path.search("/menu");
  let flag = false;
  if (pathmenu === -1) {
    flag = true;
  }
  console.log(flag);

  useEffect(() => {
    initFlowbite();
  }, []);

  const signoutHandler = async () => {
    try {
      await fetch(`${BASE_URL}/api/v1/logout`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      dispatch(logout());
      navigate("/auth/login");
      return null;
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const searchHandler = (e) => {
    console.log(e.target.value);
    dispatch(setSearchKeyword(e.target.value));
  };
  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            {flag ? (
              <>
                <div className="flex items-center">
                  <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      ></path>
                    </svg>
                  </button>

                  <Link to="/" className="flex w-full ml-2 md:mr-24">
                    <img src="/logo.png" className="h-10 mr-3" alt="Logo" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <button
                    data-drawer-target="logo-sidebar"
                    data-drawer-toggle="logo-sidebar"
                    aria-controls="logo-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                      ></path>
                    </svg>
                  </button>

                  <Link to="/" className="flex w-full ml-2 md:mr-24">
                    <img
                      src="/logo2.png"
                      className="sm:hidden h-10 mr-3"
                      alt="Logo"
                    />
                    <img
                      src="/logo.png"
                      className="hidden sm:block h-10 mr-3"
                      alt="Logo"
                    />
                  </Link>
                </div>
                <div className=" block relative mx-auto  text-gray-600">
                  <input
                    className="border-2 border-gray-300 bg-white w-[200px] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder="Search"
                    onChange={(e) => searchHandler(e)}
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 mt-3 mr-4"
                  >
                    <BiSearch />
                  </button>
                </div>
              </>
            )}
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  {userInfo ? (
                    <button
                      type="button"
                      className="flex justify-center"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="flex flex-row bg-[#fff] active:bg-white ">
                        <p
                          className="text-md hidden sm:block  text-gray-900 font-[600] capitalize dark:text-white  mt-2"
                          role="none"
                        >
                          {userInfo.name}
                        </p>
                        <MdOutlineArrowDropDown className="hidden sm:block mt-3" />
                        <img
                          className="w-10 h-10 flex justify-center rounded-full"
                          src={userInfo.avatar.url}
                          alt="user photo"
                        />
                      </div>
                    </button>
                  ) : (
                    <button
                      type="button"
                      className=""
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <FaUserCircle className="w-10 h-10 rounded-full bg-[#fff]" />
                    </button>
                  )}
                </div>
                {cartItems.length > 0 && (
                  <Link to={`/vendor/${vendorId}/cart`}>
                    <div className="cart-button bg-[#ff742e] rounded-full ml-1 pt-[5px] w-10 h-10 justify-item-center justify-center">
                      <HiShoppingBag
                        size={24}
                        color="white"
                        className="m-auto"
                      />
                      <p className="text-[9px] w-3 rounded-full text-center bg-white mt-[-8px] ml-auto mr-auto">
                        {cartItems.length}
                      </p>
                    </div>
                  </Link>
                )}

                {userInfo ? (
                  <div
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p
                        className="text-sm text-gray-900 dark:text-white capitalize"
                        role="none"
                      >
                        {userInfo.name}
                      </p>
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {userInfo.email}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          data-modal-target="small-modal"
                          data-modal-toggle="small-modal"
                          className="block px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 w-full"
                          role="menuitem"
                        >
                          Settings
                        </button>
                      </li>

                      <li>
                        <p
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                          role="menuitem"
                          onClick={signoutHandler}
                        >
                          Sign out
                        </p>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <ul className="py-1" role="none">
                      <li>
                        <Link
                          to="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/auth/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign Up
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/auth/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                          role="menuitem"
                        >
                          Sign In
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          {userInfo ? (
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ml-3 capitalize">Dashboard</span>
                </Link>
              </li>
              <li>
                <button
                  data-modal-target="small-modal"
                  data-modal-toggle="small-modal"
                  className="w-full flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaUserAlt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 capitalize">User</span>
                </button>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <AiOutlineUnorderedList className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 capitalize">Active Orders</span>
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <BiFoodMenu className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 capitalize">Previous Orders</span>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  href="/"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 21"
                  >
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                  </svg>
                  <span className="ml-3 capitalize">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <FaSignInAlt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 capitalize">Sign In</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <GiNotebook className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className="ml-3 capitalize">Sign Up</span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </aside>
      {userInfo && (
        <div
          id="small-modal"
          tabindex="-1"
          className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-transparent rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                  <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdown"
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                    type="button"
                  >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 3"
                    >
                      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                  </button>
                  {/* <!-- Dropdown menu --> */}
                  <div
                    id="dropdown"
                    className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  >
                    <ul className="py-2" aria-labelledby="dropdownButton">
                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          Edit
                        </a>
                      </li>

                      <li>
                        <a
                          href="#"
                          className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        >
                          close
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col items-center pb-10">
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={userInfo.avatar.url}
                    alt="user image"
                  />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {userInfo.name}
                  </h5>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {userInfo.email}
                  </span>
                  <div className="flex mt-4 space-x-3 md:mt-6">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Change the password
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="p-4 sm:ml-64"></div>
      <Toaster />
    </div>
  );
};

export default Sidebar;
