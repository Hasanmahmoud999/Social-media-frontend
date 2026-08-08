import { publicRequest } from "../requestMethods";
import {
  retreivingPostFailur,
  retreivingPostStart,
  retreivingPostSuccess,
  uploadNewPostFailur,
  uploadNewPostStart,
  uploadNewPostSuccess,
} from "./slices/newPostSlice";
import {
  followUserFailure,
  followUserStart,
  followUserSuccess,
  loginFailure,
  loginStart,
  loginSuccess,
  signUpFailure,
  signUpStart,
  signUpSuccess,
  unFollowUserFailure,
  unFollowUserStart,
  unFollowUserSuccess,
  updateUserInfoFailure,
  updateUserInfoStart,
  updateUserInfoSuccess,
} from "./slices/userSlice";

export const signUp = async (dispatch, data) => {
  dispatch(signUpStart());
  try {
    const res = await publicRequest.post("auth/register", data);
    dispatch(signUpSuccess(res.data));
  } catch (err) {
    dispatch(signUpFailure());
  }
};

export const login = async (dispatch, data) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("auth/login", data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

//Uploading a newPost to the server
export const uploadNewPost = async (data, dispatch) => {
  dispatch(uploadNewPostStart());
  try {
    const res = await publicRequest.post("posts", data);
    dispatch(uploadNewPostSuccess(data));
  } catch (err) {
    dispatch(uploadNewPostFailur());
    console.log(err);
  }
};

export const getTimeLinePosts = async (dispatch, id) => {
  dispatch(retreivingPostStart());
  try {
    const res = await publicRequest.get(`posts/${id}/timeline`);
    dispatch(retreivingPostSuccess(res.data));
  } catch (error) {
    dispatch(retreivingPostFailur());
  }
};

export const updateUser = async (id, UserData, dispatch, TOKEN) => {
  dispatch(updateUserInfoStart());
  try {
    const res = await publicRequest.put(`user/${id}`, UserData, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(updateUserInfoSuccess(res.data.user));
  } catch (error) {
    dispatch(updateUserInfoFailure());
  }
};

export const followUser = async (dispatch, id, user, TOKEN) => {
  dispatch(followUserStart());
  try {
    const followReq = await publicRequest.put(`user/${id}/follow`, user, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(followUserSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(followUserFailure());
  }
};
export const unFollowUser = async (dispatch, id, user, TOKEN) => {
  dispatch(unFollowUserStart());
  try {
    const unFollowReq = await publicRequest.put(`user/${id}/unfollow`, user, {
      headers: { token: `Bearer ${TOKEN}` },
    });
    dispatch(unFollowUserSuccess(id));
  } catch (error) {
    console.log(error);
    dispatch(unFollowUserFailure());
  }
};
