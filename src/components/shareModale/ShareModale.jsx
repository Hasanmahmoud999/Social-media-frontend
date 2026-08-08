import React from "react";
import { UilTimes } from "@iconscout/react-unicons";
import PostShare from "../postShare/PostShare";

const ShareModale = ({ modaleOpened, setModaleOpened }) => {
    return (
        <div className={modaleOpened ? "profileModale open" : "profileOpened"}>
            <div className="profileInfo">
                <span>
                    <UilTimes
                        style={{ cursor: "pointer" }}
                        onClick={() => setModaleOpened(false)}
                    />
                </span>
                <PostShare />
            </div>
        </div>
    );
};

export default ShareModale;
