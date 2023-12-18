import React, { Suspense, useEffect , useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../slices/cartSlice";
import { setProductList } from "../slices/productSlice";
import { setVendorId } from "../slices/vendorSlice";
import { BASE_URL } from "../helper";
import Loader from "./Loader";

const MenuCard = ({ product, handler }) => {
  const { name, user, price, images, _id } = product;
  const image = images[0].url;
  const id = _id;
  return (
    <div className=" lg:w-72  bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src={image}
          alt="Product"
          className="h-30 w-40 lg:h-80 lg:w-72 object-cover rounded-t-xl"
        />
        <div className="px-4 py-3  lg:w-72">
          <span className="text-gray-400 mr-3 uppercase text-xs">
            {user.name}
          </span>
          <p className="text-sm sm:text-lg font-bold text-black truncate block capitalize">
            {name}
          </p>
          <div className="flex items-center">
            <p className="text-sm sm:text-lg font-semibold text-black cursor-auto my-3">
              ₹ {price}
            </p>
            <del>
              {/* <p className="text-xsm text-gray-600 cursor-auto ml-2">$199</p> */}
            </del>
            <div
              className="ml-auto cursor-pointer"
              onClick={() =>
                handler({ name, user, price, image, id, quantity: 1 })
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

const MenuItems = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.searchKeyword);
  const productData = useSelector((state) => state.product.productList);
  console.log(productData);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setVendorId(id));
        const res = await fetch(
          `${BASE_URL}/api/v1/${id}/products?keyword=${keyword}`,
          {
            method: "GET",
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          dispatch(setProductList(data.products));
          setLoading(false);
        } else {
          console.error("Error fetching products:", res.statusText);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, productData]);

  const addToCartHandler = (options) => {
    dispatch(addToCart(options));
    console.log(options);
    toast.success("Added to cart");
  };

  if (loading === true) {
    return <Loader loading={loading} />;
  }

  return (
    <section className=" flex flex-auto flex-wrap justify-items-center justify-center gap-x-5 gap-y-10 md:gap-y-10 md:gap-x-10 lg:gap-y-14 lg:gap-x-10 mt-[20px] mb-5 mr-auto ml-auto sm:mr-5">
      {productData?.map((product) => (
        <MenuCard
          product={product}
          handler={addToCartHandler}
          key={product._id}
        />
      ))}
    </section>
  );
};

export default MenuItems;
