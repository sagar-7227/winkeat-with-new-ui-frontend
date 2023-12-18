import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { increment, decrement, removeFromCart } from "../slices/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../helper";
import Loader from "./Loader";

const CartItems = () => {
  const [loading, setLoading] = useState();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const state = useSelector((state) => state.cart);

  const params = useParams();
  console.log(params.id);

  console.log(cartItems);

  const dispatch = useDispatch();

  const incrementHandler = (id) => {
    dispatch(increment(id));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Removed from cart");
  };

  const decrementHandler = (id) => {
    dispatch(decrement(id));
  };

  const placeOrder = async () => {
    setLoading(true);
    console.log("called place order");
    let orderItems = [];
    let totalPrice = state.total;
    let vendor = params.id;
    cartItems.map((item) => {
      orderItems.push({
        product: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      });
    });

    const requestBody = {
      orderItems,
      totalPrice,
      vendor,
    };

    // console.log(orderData);
    const res = await axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      url: `${BASE_URL}/api/v1/order/new`,
      data: requestBody,
    });
    if (res.data.success) {
      const orderId = res.data.order._id;
      checkoutHandler(orderId);
      setLoading(false);
    }
  };

  const checkoutHandler = async (orderId) => {
    // console.log(amount);
    const {
      data: { order },
    } = await axios.post(
      `${BASE_URL}/api/v1/checkout`,
      {
        amount: state.total,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    // console.log(data);

    const {
      data: { key },
    } = await axios.get(`${BASE_URL}/api/v1/get-razorpay-api-key`, {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    // console.log(window);

    // const {
    //   data: { userData },
    // } = await axios.get("/api/user/about");

    // const res = await fetch("/api/user/about", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    // });
    // const data = await res.json();

    const authToken = localStorage.getItem("token"); // Retrieve the JWT token from localStorage
    const callbackUrl = `${BASE_URL}/api/v1/paymentverification?token=${authToken}&orderId=${orderId}`;

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Winkeat",
      description: "winkeat logo",
      image: "/logo2.png",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: callbackUrl,
      prefill: {
        name: userInfo.name,
        contact: userInfo.email,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#ffcf52",
      },
    };
    const razor = new window.Razorpay(options);
    // placeOrder();
    razor.open();
  };

  if (loading === true) {
    return <Loader loading={loading} />;
  }

  return (
    <div className="cart">
      <main className="">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              id={item.id}
              price={item.price}
              imgSrc={item.image}
              quantity={item.quantity}
              increment={(id) => {
                incrementHandler(id);
              }}
              decrement={(id) => {
                decrementHandler(id);
              }}
              deletehandler={(id) => {
                removeFromCartHandler(id);
              }}
            />
          ))
        ) : (
          <h1 className="mt-10">Cart is empty</h1>
        )}
      </main>
      <aside>
        <h2>Subtotal: ₹{state.subTotal}</h2>
        <h2>Shipping: ₹{state.shipping}</h2>
        <h2>Tax: ₹{state.tax}</h2>
        <h2>Total: ₹{state.total}</h2>
        <button
          onClick={placeOrder}
          class="text-white text-[18px] w-[80%] h-[50px] mb-3 mt-[4rem] mx-auto  bg-[#ff742e] hover:bg-[#ff742ebc] focus:ring-4 focus:outline-none focus:ring-[#ff742e3b] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Proceed to checkout
          <svg
            class="w-3.5 h-3.5 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </aside>
    </div>
  );
};

const CartItem = ({
  name,
  id,
  price,
  imgSrc,
  quantity,
  increment,
  decrement,
  deletehandler,
}) => (
  <div className="cartItem w-[90%]   border-2 border-[#ff742e] rounded-md shadow-md">
    <img
      loader={() => imgSrc}
      src={imgSrc}
      className="w-[50px] rounded-md"
      alt="Picture of the author"
    />
    <article>
      <h4>{name}</h4>
      <h4>₹{price}</h4>
    </article>
    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{quantity}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>
    <AiFillDelete
      onClick={() => {
        deletehandler(id);
      }}
    />
  </div>
);

export default CartItems;
