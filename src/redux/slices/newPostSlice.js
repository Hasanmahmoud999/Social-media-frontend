import { createSlice } from "@reduxjs/toolkit";

const newPostSlice = createSlice({
  name: "newPost",
  initialState: {
    posts: [],
    isFetching: false,
    error: false,
    uploading: false,
  },
  reducers: {
    uploadNewPostStart: (state) => {
      state.isFetching = true;
      state.uploading = true;
      state.error = false;
    },
    uploadNewPostSuccess: (state, action) => {
      state.isFetching = false;
      state.uploading = false;
      state.error = false;
      state.posts.unshift(action.payload);
    },
    uploadNewPostFailur: (state) => {
      state.uploading = false;
      state.isFetching = false;
      state.error = true;
    },
    //RETREIVING THE POSTS
    retreivingPostStart: (state) => {
      state.isFetching = true;
      state.uploading = true;
      state.error = false;
    },
    retreivingPostSuccess: (state, action) => {
      state.isFetching = false;
      state.uploading = false;
      state.error = false;
      const uniquePosts = Array.from(
        new Map(action.payload.map((post) => [post._id, post])).values(),
      );
      state.posts = uniquePosts;
    },
    retreivingPostFailur: (state) => {
      state.uploading = false;
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const {
  uploadNewPostStart,
  uploadNewPostSuccess,
  uploadNewPostFailur,
  retreivingPostStart,
  retreivingPostSuccess,
  retreivingPostFailur,
} = newPostSlice.actions;
export default newPostSlice.reducer;
