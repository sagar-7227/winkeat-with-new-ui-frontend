import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartItems: [],
  subTotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      console.log(action.payload);
      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) {
            i.quantity += item.quantity;
          }
        });
      } else {
        state.cartItems.push(item);
      }

      state.subTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.shipping = state.subTotal > 100 ? 0 : 0;

      state.tax = Number((0.0 * state.subTotal).toFixed(2));

      state.total = Number(
        (state.subTotal + state.shipping + state.tax).toFixed(2)
      );
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((x) => x.id !== id);

      state.subTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.shipping = state.subTotal > 100 ? 0 : 10;

      state.shipping = state.subTotal === 0 ? 0 : 10;

      state.tax = Number((0.0 * state.subTotal).toFixed(2));

      state.total = Number(
        (state.subTotal + state.shipping + state.tax).toFixed(2)
      );
    },

    increment: (state, action) => {
      const id = action.payload;
      state.cartItems.forEach((i) => {
        if (i.id === id && i.quantity < 10) {
          i.quantity++;
        } else if (i.id === id && i.quantity === 10) {
          toast.error("Quantity can't be more than 10");
        }
      });

      state.subTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.shipping = state.subTotal > 100 ? 0 : 10;
      state.shipping = state.subTotal === 0 ? 0 : 10;

      state.tax = Number((0.0 * state.subTotal).toFixed(2));

      state.total = Number(
        (state.subTotal + state.shipping + state.tax).toFixed(2)
      );
    },
    decrement: (state, action) => {
      const id = action.payload;
      state.cartItems.forEach((i) => {
        if (i.id === id && i.quantity > 1) {
          i.quantity--;
        } else if (i.id === id && i.quantity === 1) {
          removeFromCart(id);
          toast.error("Quantity can't be less than 1 please remove from cart");
        }
      });

      state.subTotal = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      if (state.subTotal === 0) {
        state.shipping = 0;
      } else if (state.subTotal > 100) {
        state.shipping = 0;
      } else {
        state.shipping = 10;
      }
      state.tax = Number((0.0 * state.subTotal).toFixed(2));

      state.total = Number(
        (state.subTotal + state.shipping + state.tax).toFixed(2)
      );
    },

    emptyCart: (state) => {
      state.cartItems = [];
      state.subTotal = 0;
      state.shipping = 0;
      state.tax = 0;
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
