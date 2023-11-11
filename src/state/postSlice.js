import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {records: [], loading:false, error: null, record: null}

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

export const fetchPost = createAsyncThunk("posts/fetchPost", async (id, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await fetch("http://127.0.0.1:8888/api/post/" + id, {
            method: "GET",
        });
        const data = await res.json();
        return data.data;
    }catch (error) {
        return rejectWithValue(error.message)
    }
});

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

export const insertPost = createAsyncThunk("posts/insertPost", async (item, thunkAPI) => {
    const {rejectWithValue, getState} = thunkAPI;
    const {auth} = getState();
    console.log(auth);
    item.user_id = auth.id;
    try {
        const ref = await fetch("http://127.0.0.1:8888/api/post/" , {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-type" : "application/json; charset=UTF-8"
            }
        });
        const data = await ref.json();
        return data.data;
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
 // get post
        [fetchPost.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.record = null;
        },
        [fetchPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.record = action.payload;
        },
        [fetchPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // create post
        [insertPost.pending]: (state) => {
            state.loading = true;
            state.error = null;
        },
        [insertPost.fulfilled]: (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
            // state.records = action.payload;
        },
        [insertPost.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

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