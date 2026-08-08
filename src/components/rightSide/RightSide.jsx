import React, { useEffect, useState } from "react";
import "./RightSide.css";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../trendCard/TrendCard";
import ShareModale from "../shareModale/ShareModale";
import { Link } from "react-router-dom";
const RightSide = () => {
    const [modaleOpened, setModaleOpened] = useState(false);
    useEffect(() => {
        const toggleScroll = (isModalOpen) => {
            if (isModalOpen) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
            }
        };
        toggleScroll(modaleOpened);
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modaleOpened]);
    return (
        <div className="rightSide">
            <div className="navIcons">
                <Link
                    className="link"
                    to="/home"
                >
                    <img
                        src="/images/home.png"
                        alt=""
                    />
                </Link>
                <UilSetting />
                <img
                    src="/images/noti.png"
                    alt=""
                />
                <img
                    src="/images/comment.png"
                    alt=""
                />
            </div>
            <TrendCard />
            <button
                className="button r-button"
                onClick={() => setModaleOpened(true)}
            >
                Share
            </button>
            {modaleOpened && (
                <ShareModale
                    modaleOpened={modaleOpened}
                    setModaleOpened={setModaleOpened}
                />
            )}
        </div>
    );
};

export default RightSide;
