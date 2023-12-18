import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductList } from "../../slices/productSlice";
import { FaEdit } from "react-icons/fa";
import InventoryEditForm from "./InventoryEditForm";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "../../helper";
import Loader from "../Loader";

const InventoryCard = ({ product, key }) => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleIncrementStock = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/product/stock-increment-by-one/${product._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        // setProduct(updatedProduct.product);
        toast.success("Stock incremented successfully");
        setLoading(false);
      } else {
        toast.error("Error decrementing stock: " + response.statusText);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error decrementing stock: " + error.message);
      setLoading(false);
    }
  };

  const handleDecrementStock = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/api/v1/product/stock-decrement-by-one/${product._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      if (response.ok) {
        const updatedProduct = await response.json();
        // setProduct(updatedProduct.product);
        toast.success("Stock decremented successfully");
        setLoading(false);
      } else {
        toast.error("Error decrementing stock: " + response.statusText);
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error decrementing stock: " + error.message);
      setLoading(false);
    }
  };

  const image = product.images[0];

  const editInventoryHandler = () => {
    navigate(`/inventory/${product._id}/edit`);
  };

  if (loading === true) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <div class=" bg-white flex m-2 shadow-lg border border-[#ff742e] rounded-lg overflow-hidden">
        {image.url && (
          <img
            src={image.url}
            alt=""
            class=" h-36 object-contain"
            loading="lazy"
          />
        )}

        <div class=" p-2 w-full">
          <div className="title flex  justify-between  w-full">
            <h1 class="text-lg capitalize font-semibold text-slate-900 mr-[-15px] w-[100%]">
              {product.name}
            </h1>
            <button
              title="edit this inventory item"
              className="edit cursor-pointer hover:text-[#fc4a4a]"
              onClick={editInventoryHandler}
            >
              <FaEdit
                data-modal-target="defaultModal1"
                data-modal-toggle="defaultModal1"
              />
            </button>
          </div>
          <div class="text-lg font-semibold text-slate-500">
            ₹{product.price}
          </div>
          {product.stock > 0 ? (
            <div class="text-sm font-medium text-slate-700 mt-2">In Stock</div>
          ) : (
            <div class="text-sm font-medium text-slate-700 mt-2">
              Out of Stock
            </div>
          )}

          <div class="mt-4 flex items-center  justify-between">
            <div className="flex justify-between space-x-2 w-[80%] mx-auto">
              <button
                className="bg-[#ff742e] w-[33%]  ease-out duration-300 hover:scale-125 rounded-md text-[#fff]"
                onClick={() => handleDecrementStock()}
              >
                -
              </button>
              <p className="">{product.stock}</p>
              <button
                className=" bg-[#ff742e] w-[33%] ease-out duration-300 hover:scale-125 rounded-md text-[#fff]"
                onClick={() => handleIncrementStock()}
              >
                +
              </button>
            </div>
            {/* <button
            class="h-8 px-4 bg-[#f11] text-white ease-in duration-300 hover:scale-110  font-semibold rounded-md border border-slate-200"
            type="button"
          >
            Out of Stock
          </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

const InventoryItems = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const keyword = useSelector((state) => state.search.searchKeyword);
  const productData = useSelector((state) => state.product.productList);
  const userInfo = useSelector((state) => state.auth.userInfo);
  console.log(productData);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/v1/${userInfo._id}/products?keyword=${keyword}`,
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
  }, [productData]);

  if (loading === true) {
    return <Loader loading={loading} />;
  }
  return (
    <div className=" grid lg:grid-cols-2  ">
      {productData?.map((product) => (
        <InventoryCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default InventoryItems;
