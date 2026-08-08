import React from "react";
import "./ProfileSide.css";
import LogoSearch from "../logosearch/LogoSearch";
import ProfileCard from "../profileCard/ProfileCard";
import FollowersCard from "../followersCard/FollowersCard";

const ProfileSide = () => {
  return (
    <div className="profileSide">
      <LogoSearch />
      <ProfileCard location="homePage" />
      <FollowersCard />
    </div>
  );
};

export default ProfileSide;
