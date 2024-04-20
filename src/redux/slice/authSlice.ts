import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    token: null,
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.data.token = action.payload;
    },
    logOut: (state) => {
      state.data.token = initialState.data.token;
    },
  },
});

export default authSlice.reducer;
export const { setToken, logOut } = authSlice.actions;
