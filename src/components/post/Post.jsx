import React, { useEffect, useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { format } from "timeago.js";




  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

const Post = ({ data,person }) => {
  const user = useSelector((state) => state.users.currentUser);
  const [liked, setLiked] = useState(data.likes?.includes(user._id));
  const [likes, setLikes] = useState(data.likes?.length);
  
console.log(data)
console.log(person)
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
      <div className="detail">
        <div>
          <div>
          <img src={   person?.profilePicture ?
                serverPublic + person.profilePicture
                : serverPublic + "defaultProfile.jpg"} alt="" />
          </div>
          <div className="detailInf">
          <b>{person?.firstname}</b>
          <span>{format(data.createdAt)}</span>
          </div>

        </div>
        <span> {data.desc}</span>
      </div>
      <img
        src={data.image ? serverPublic + data.image : ""}
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

      
    </div>
  );
};

export default Post;
