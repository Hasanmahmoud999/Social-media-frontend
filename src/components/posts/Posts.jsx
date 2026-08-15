import React, { useEffect, useState } from "react";
import "./Posts.css";
import { PostsData } from "./../../data/PostsData";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import {
  retreivingPostFailur,
  retreivingPostStart,
  retreivingPostSuccess,
} from "../../redux/slices/newPostSlice";
import { getTimeLinePosts } from "../../redux/apiCalls";
import { useParams } from "react-router-dom";

const Posts = () => {
     const [persons, setPersons] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.currentUser);
  let { posts, isFetching } = useSelector((state) => state.posts);
  if (!posts) return "NO POSTS...";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
  useEffect(() => {
    getTimeLinePosts(dispatch, user._id);
      const fetchPerson = async () => {
            const getAllUser = await publicRequest.get("user");
            setPersons(getAllUser.data);            
          };
          fetchPerson();
  }, []);
  
  return (
    <div className="posts">
      {isFetching ?
        "Fetching Posts..."
      : posts.map((post, id) => {
          return (
            <Post
            person={persons?.find(person=>person._id===post.userId)}
              data={post}
              id={id}
            />
          );
        })
      }
    </div>
  );
};

export default Posts;
