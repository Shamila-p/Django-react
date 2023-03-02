import { createSlice } from "@reduxjs/toolkit";

const usernameSlice2 = createSlice({
  name: "username2",
  initialState: null,
  reducers: {
    change: (state, action) => {
      return action.payload
    },
  },
});

export const { change2 } = usernameSlice2.actions;

export default usernameSlice2.reducer;