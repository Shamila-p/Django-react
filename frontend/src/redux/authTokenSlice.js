import { createSlice } from '@reduxjs/toolkit';


const authTokenSlice = createSlice({
    name : 'authToken',
    initialState: null,
    reducers: {
        setAuthToken: (state, action) => {
            return action.payload;
        }
    }
});


export const { setAuthToken } = authTokenSlice.actions;

export default authTokenSlice.reducer;