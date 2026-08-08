import React, { useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";

const Post = ({ data }) => {
  const user = useSelector((state) => state.users.currentUser);
  const [liked, setLiked] = useState(data.likes?.includes(user._id));
  const [likes, setLikes] = useState(data.likes?.length);

  const handleLike = async () => {
    setLiked(!liked);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
    try {
      await publicRequest.put(`posts/${data._id}/like`, {
        userId: user._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="post">
      <img
        src={data.image ? import.meta.env.VITE_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? "/images/like.png" : "/images/notlike.png"}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src="/images/comment.png"
          alt=""
        />
        <img
          src="/images/share.png"
          alt=""
        />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="detail">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;
