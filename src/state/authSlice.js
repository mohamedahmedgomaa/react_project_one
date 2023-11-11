import {createSlice} from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {id: 1, isLoggedId: true},
    reducers: {},
});

export default authSlice.reducer