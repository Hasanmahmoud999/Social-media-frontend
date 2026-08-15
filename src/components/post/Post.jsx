import React, { useEffect, useState } from "react";
import "./Post.css";
import { useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { format } from "timeago.js";
import { IoSend } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";



const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

const Post = ({ data, person }) => {
  const user = useSelector((state) => state.users.currentUser);
  const [liked, setLiked] = useState(data.likes?.includes(user._id));
  const [likes, setLikes] = useState(data.likes?.length);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(data.comments || []);
  const [loading, setLoading] = useState(false);
  const [userMap, setUserMap] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const uniqueUserIds = [...new Set(comments.map((c) => c.userId))];
      const users = {};

      for (const userId of uniqueUserIds) {
        try {
          const response = await publicRequest.get(`/user/${userId}`);
          users[userId] = response.data;
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      }

      setUserMap(users);
      
    };

    if (comments.length > 0) {
      fetchUserData();
    }
  }, [comments]);

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

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      alert("Please leave a comment");
      return;
    }

    setLoading(true);
    try {
      const response = await publicRequest.post(`posts/${data._id}/comment`, {
        userId: user._id,
        text: commentText,
      });

      setComments(response.data.comments);
      setCommentText("");
      setShowCommentBox(false);
    } catch (error) {
      console.log("Error adding comment:", error);
      alert("An error occurred while adding the comment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    try {
      const response = await publicRequest.delete(
        `posts/${data._id}/comment/${commentId}`,
        {
          data: { userId: user._id },
        }
      );

      setComments(response.data.comments);
      
    } catch (error) {
      console.log("Error deleting comment:", error);
      alert("An error occurred while deleting the comment.");
    }
  };

  return (
    <div className="post">
      <div className="detail">
        <div>
          <div>
            <img
              src={
                person?.profilePicture
                  ? serverPublic + person.profilePicture
                  : serverPublic + "defaultProfile.jpg"
              }
              alt=""
            />
          </div>
          <div className="detailInf">
            <b>{person?.firstname}</b>
            <span>{format(data.createdAt)}</span>
          </div>
        </div>
        <span>{data.desc}</span>
      </div>
      <img src={data.image ? serverPublic + data.image : ""} alt="" />

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
          style={{ cursor: "pointer" }}
          onClick={() => setShowCommentBox(!showCommentBox)}
          title="أضف تعليق"
        />
        <img src="/images/share.png" alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      <div className="commentsSection">
        {showCommentBox && (
          <div className="commentInputBox">
            <textarea
              placeholder=
                "Write your comment here..."
              
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={loading}
            />
            <button onClick={handleAddComment} disabled={loading}>
              {loading ? "..." : <IoSend/>}
            </button>
          </div>
        )}

        {comments.length > 0 ? (
          <div className="commentsList">
            {comments.map((comment) => {
              const commentUser = userMap[comment.userId];
              return (
                <div key={comment._id} className="commentItem">
                  <img
                    src={
                      commentUser?.profilePicture
                        ? serverPublic + commentUser.profilePicture
                        : serverPublic + "defaultProfile.jpg"
                    }
                    alt=""
                  />
                  <div className="commentContent">
                    <div className="commentHeader">
                      <div>
                        <strong>{commentUser?.firstname || "مستخدم"}</strong>
                        <span>{format(comment.createdAt)}</span>
                      </div>
                      {comment.userId === user._id && (
                        <button
                          className="deleteCommentBtn"
                          onClick={() => handleDeleteComment(comment._id)}
                        >
                          <span>Delete</span>
                          <MdDeleteOutline />
                        </button>
                      )}
                    </div>
                    <div className="commentText">{comment.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          showCommentBox && (
            <div className="noComments">No comments yet</div>
          )
        )}
      </div>
    </div>
  );
};

export default Post;
