import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendorId: "",
};

const vendorSlice = createSlice({
  name: "vendor",
  initialState,
  reducers: {
    setVendorId: (state, action) => {
      state.vendorId = action.payload;
    },
  },
});

export const { setVendorId } = vendorSlice.actions;

export default vendorSlice.reducer;
