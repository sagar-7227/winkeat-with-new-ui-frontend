import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../helper";
import Loader from "../Loader";

const InventoryForm = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => setInput(e.target.value);

  const isError = input === "";

  const [data, setData] = useState({
    name: String,
    category: String,
    price: Number,
    stock: Number,
    description: String,
  });

  const { name, category, price, stock, description } = data;

  console.log(image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !name ||
      !category ||
      !price ||
      !stock ||
      !description ||
      image === null
    ) {
      toast.error("Please fill the all required fields");
    } else {
      try {
        // console.log(itemDetails.size)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("image", image);
        console.log(...formData);
        const response = await fetch(`${BASE_URL}/api/v1/product/new`, {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
          body: formData,
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            toast.success("Product created successfully");
            setData({
              name: "",
              category: "",
              price: "",
              stock: "",
              description: "",
            });
            setImage(null);
            setLoading(false);
          } else {
            toast.error(data.message);
            setLoading(false);
          }
        } else {
          toast.error("This item is alread already available in intventory");
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Internal server error");
        setLoading(false);
      }
    }
  };

  if (loading === true) {
    return <Loader loading={loading} />;
  }

  return (
    <>
      <FormControl className="space-y-4" isInvalid={isError}>
        <div className="container-1 w-full flex flex-wrap justify-around">
          <div class="flex items-center justify-center w-full">
            <label
              for="dropzone-file"
              class="flex flex-col items-center justify-center w-full h-23 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {image ? (
                <img
                  src={window.URL.createObjectURL(image)}
                  alt="profile"
                  className="ml-auto mr-auto h-[100px]"
                />
              ) : (
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
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
          <div className="w-full lg:w-1/2 ">
            <FormLabel>Name</FormLabel>
            <Input
              type="Name"
              value={name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            {!isError ? (
              <FormHelperText>
                Enter the Product Name you'd like to receive the Inventory on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </div>
          <div className="w-full lg:w-1/2 lg:pl-5">
            <FormLabel>Category</FormLabel>
            <Input
              type="Name"
              value={category}
              onChange={(e) => setData({ ...data, category: e.target.value })}
            />
            {!isError ? (
              <FormHelperText>
                Enter the Category you'd like to receive the Inventory on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Category is required.</FormErrorMessage>
            )}
          </div>
        </div>
        <div className="container-1 w-full flex flex-wrap justify-around">
          <div className="w-full lg:w-1/2 ">
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              value={price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
            {!isError ? (
              <FormHelperText>
                Enter the Price of Product you'd like to receive the Inventory
                on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Price is required.</FormErrorMessage>
            )}
          </div>
          <div className="w-full lg:w-1/2 lg:pl-5">
            <FormLabel>Stock</FormLabel>
            <Input
              type="number"
              value={stock}
              onChange={(e) => setData({ ...data, stock: e.target.value })}
            />
            {!isError ? (
              <FormHelperText>
                Enter the Stock you'd like to receive the Inventory on.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Stock is required.</FormErrorMessage>
            )}
          </div>
        </div>
        <div className="container-1  flex flex-wrap">
          <FormLabel textAlign={"left"}>Description</FormLabel>
          <Textarea
            placeholder="Here is a sample placeholder"
            size="sm"
            resize="none"
            value={description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>
        <div className="container-1 lg:space-x-4 flex flex-wrap justify-around w-full  ">
          <Button
            onClick={handleSubmit}
            className="w-1/2 "
            colorScheme="orange"
          >
            Add Inventory
          </Button>
          <Button className="w-1/3" colorScheme="orange" variant="outline">
            Cencel
          </Button>
        </div>
      </FormControl>
      <Toaster />
    </>
  );
};

export default InventoryForm;
