import React from "react";
import LogoSearch from "../logosearch/LogoSearch";
import FollowersCard from "../followersCard/FollowersCard";
import InfoCard from "../infoCard/InfoCard";

const ProfileLeft = () => {
    return (
        <div className="profileSide">
            <LogoSearch />
            <InfoCard />
            <FollowersCard />
        </div>
    );
};

export default ProfileLeft;
