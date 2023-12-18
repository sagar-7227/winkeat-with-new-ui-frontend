import { createSlice } from "@reduxjs/toolkit";

try {
  if (typeof window !== "undefined") {
    var userinfo = localStorage.getItem("userInfo");
    var userinfoJson = JSON.parse(userinfo);
  }
} catch (err) {
  console.log("err", err);
}

const initialState = {
  isLoading: false,
  userInfo: userinfo ? userinfoJson : null, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      state.success = true;
      state.isLoading = false;
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
    },
    logout(state, action) {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading, setError } =
  authSlice.actions;

export default authSlice.reducer;
