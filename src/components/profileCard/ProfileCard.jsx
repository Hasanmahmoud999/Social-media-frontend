import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { publicRequest } from "../../requestMethods";

const ProfileCard = ({ location }) => {
  const params = useParams();
  const [persons, setPersons] = useState([]);

  const user = useSelector((state) => state.users.currentUser);
  const posts = useSelector((state) => state.posts.posts);
  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchPerson = async () => {
      const getAllUser = await publicRequest.get("user");
      setPersons(getAllUser.data);
    };
    fetchPerson();
  }, [params.id]);
  const selectedPerson = persons.find((person) => person._id === params.id);
  return (
    <div className="profileCard">
      <div className="profileImage">
        <img
          style={{ height: location === "profilePage" ? "" : "auto" }}
          src={
            user._id === params.id || location !== "profilePage" ?
              user.coverPicture ?
                serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
            : selectedPerson?.coverPicture ?
              serverPublic + selectedPerson.coverPicture
            : serverPublic + "defaultCover.jpg"
          }
          alt=""
        />
        <img
          style={{
            height: location === "profilePage" ? "110px" : "100px",
            width: location === "profilePage" ? "110px" : "100px",
          }}
          src={
            user._id === params.id || location !== "profilePage" ?
              user.profilePicture ?
                serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.jpg"
            : selectedPerson?.profilePicture ?
              serverPublic + selectedPerson.profilePicture
            : serverPublic + "defaultProfile.jpg"
          }
          alt=""
        />
      </div>
      <div className="profileName">
        {user._id === params._id || location !== "profilePage" ?
          <>
            <span>
              {user.firstname} {user.lastname}
            </span>
            <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
          </>
        : <>
            <span>
              {selectedPerson?.firstname} {selectedPerson?.lastname}
            </span>
            <span>{user.worksAt ? user.worksAt : "Write about yourself"}</span>
          </>
        }
      </div>
      <div className="followStatus">
        <hr />
        <div>
          {user._id === params.id || location !== "profilePage" ?
            <>
              <div className="follow">
                <span>{user?.following?.length}</span>
                <span>Following</span>
              </div>
              <div className="vl"></div>
              <div className="follow">
                <span>{user.followers?.length}</span>
                <span>Followers</span>
              </div>
              {location === "profilePage" && (
                <>
                  <div className="vl"></div>
                  <div className="follow">
                    <span>
                      {posts.filter((post) => post.userId === user._id).length}
                    </span>
                    <span>Posts</span>
                  </div>
                </>
              )}
            </>
          : <>
              <div className="follow">
                <span>{selectedPerson?.following?.length}</span>
                <span>Following</span>
              </div>
              <div className="vl"></div>
              <div className="follow">
                <span>{selectedPerson?.followers?.length}</span>
                <span>Followers</span>
              </div>
              {location === "profilePage" && (
                <>
                  <div className="vl"></div>
                  <div className="follow">
                    <span>
                      {
                        posts.filter(
                          (post) => post.userId === selectedPerson?._id,
                        ).length
                      }
                    </span>
                    <span>Posts</span>
                  </div>
                </>
              )}
            </>
          }
        </div>
        <hr />
      </div>
      {location === "profilePage" ?
        ""
      : <span>
          <Link
            className="link"
            to={`/profile/${user._id}`}
          >
            My Profile
          </Link>
        </span>
      }
    </div>
  );
};

export default ProfileCard;
