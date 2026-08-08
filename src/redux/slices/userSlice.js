import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    token: "",
  },
  reducers: {
    //REGISTER PROCCESS
    signUpStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    signUpSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.savedUser;
      state.token = action.payload.token;
    },
    signUpFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //LOGIN PROCCESS
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //UPDATE USER INFO PROCCESS
    updateUserInfoStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserInfoSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = { ...action.payload };
      state.error = false;
    },
    updateUserInfoFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //FOLLOW USER PROCCESS
    followUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    followUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.following.push(action.payload);
      state.error = false;
    },
    followUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //UNFOLLOW USER PROCCESS
    unFollowUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    unFollowUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser.following = state.currentUser.following.filter(
        (personId) => personId !== action.payload,
      );
      state.error = false;
    },
    unFollowUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    //LOGOUT PROCCESS
    logOut: (state) => {
      localStorage.clear();
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  signUpStart,
  signUpSuccess,
  signUpFailure,
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  updateUserInfoStart,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  followUserStart,
  followUserSuccess,
  followUserFailure,
  unFollowUserStart,
  unFollowUserSuccess,
  unFollowUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
