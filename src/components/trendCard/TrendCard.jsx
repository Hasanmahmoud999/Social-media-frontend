import React from "react";
import "./TrendCard.css";
import { TrendData } from "../../data/TrendData";

const TrendCard = () => {
    return (
        <div className="trendCard">
            <h3>Trend for you</h3>

            {TrendData.map((trend, id) => {
                return (
                    <div className="trend">
                        <span>#{trend.name}</span>
                        <span>{trend.shares}K shares</span>
                    </div>
                );
            })}
        </div>
    );
};

export default TrendCard;
