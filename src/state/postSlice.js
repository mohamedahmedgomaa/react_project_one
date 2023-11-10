import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {records: [], loading:false, error: null}

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await fetch("http://127.0.0.1:8888/api/post");
        const data = await res.json();
        return data.data;
    }catch (error) {
        return rejectWithValue(error.message)
    }
})

export const deletePost = createAsyncThunk("posts/deletePost", async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        await fetch("http://127.0.0.1:8888/api/post/" + id, {
            method: "DELETE",
        });
        return id;
    }catch (error) {
        return rejectWithValue(error.message)
    }
});

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
            state.records = action.payload;
        },
        [fetchPosts.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // create post

        // edit post

        // delete post
        [deletePost.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [deletePost.fulfilled]: (state, action) => {
            state.loading = false;
            state.records = state.records.filter(el =>el.id !== action.payload);
        },
        [deletePost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

    },
});

export default postSlice.reducer