import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchKeyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
});

export const { setSearchKeyword } = searchSlice.actions;

export default searchSlice.reducer;
