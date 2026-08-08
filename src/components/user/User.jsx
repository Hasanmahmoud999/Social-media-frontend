import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../redux/apiCalls";
import { Link } from "react-router-dom";

const User = ({ person }) => {
  const user = useSelector((state) => state.users.currentUser);
  const TOKEN = useSelector((state) => state.users.token);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id),
  );
  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;
  const dispatch = useDispatch();

  const handleFollow = () => {
    following ?
      unFollowUser(dispatch, person._id, user, TOKEN)
    : followUser(dispatch, person._id, user, TOKEN);
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <Link
        className="link"
        to={`/profile/${person._id}`}
      >
        <div>
          <img
            src={
              person.profilePicture ?
                serverPublic + person.profilePicture
              : serverPublic + "defaultProfile.jpg"
            }
            alt=""
            className="followerImg"
          />
          <div className="name">
            <span>{person.firstname}</span>
            <span>{person.username}</span>
          </div>
        </div>
      </Link>
      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
