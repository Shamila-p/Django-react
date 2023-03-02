import { configureStore } from "@reduxjs/toolkit";
import authTokenSlice from "./authTokenSlice";
import usernameSlice from "./usernameSlice.js";

const store = configureStore({
    reducer: {
        username: usernameSlice,
        authToken: authTokenSlice,
    }
})

export default store

