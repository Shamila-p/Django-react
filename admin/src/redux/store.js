import { configureStore } from "@reduxjs/toolkit";
import authTokenSlice from "./authTokenSlice";
import usernameSlice from "./usernameSlice"
// import usernameSlice2 from "./imageSlice"; 

const store = configureStore({
    reducer: {
        username: usernameSlice,
        authToken: authTokenSlice,
        // image: usernameSlice2,
    }
})

export default store