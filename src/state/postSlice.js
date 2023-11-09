import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {records: [], loading:false, error: null}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await fetch("http://127.0.0.1:8888/api/post");
        const data = await res.json();
        return data.data[0];
    }catch (error) {
        return rejectWithValue(error.message)
    }
})

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        // fetch posts
        [fetchPosts.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
        },
        [fetchPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // create post

        // edit post

        // delete post
    },
});

export default postSlice.reducer