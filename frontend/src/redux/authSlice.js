import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false // initially
    },
    reducers: {
        //actions
        setLoading: (state, action) => {
            state.loading = action.paylo;
        }
    }
});

export const { setLoading } = authSlice.actions;
export default authSlice.reducer;
