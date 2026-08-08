import React, { useEffect, useState } from "react";
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { publicRequest } from "./../../requestMethods";
import { logOut } from "../../redux/slices/userSlice";
import ProfileModale from "../profileModale/ProfileModale";

const InfoCard = () => {
  const [modaleOpened, setModaleOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState();
  const user = useSelector((state) => state.users.currentUser);
  useEffect(() => {
    const toggleScroll = (isModalOpen) => {
      if (isModalOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    toggleScroll(modaleOpened);

    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const profileUserInfo = await publicRequest.get(
          `user/${profileUserId}`,
        );
        setProfileUser(profileUserInfo);
      }
    };
    fetchProfileUser();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user, modaleOpened]);

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="infoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ?
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              cursor="pointer"
              onClick={() => setModaleOpened(true)}
            />
            {modaleOpened && (
              <ProfileModale
                modaleOpened={modaleOpened}
                setModaleOpened={setModaleOpened}
                data={user}
              />
            )}
          </div>
        : ""}
      </div>
      <div className="info">
        <span>
          <b>Status : </b>
        </span>
        <span>{profileUser?.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in : </b>
        </span>
        <span>{profileUser?.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at : </b>
        </span>
        <span>{profileUser?.worksAt}</span>
      </div>
      <button
        className="button logout-button"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
