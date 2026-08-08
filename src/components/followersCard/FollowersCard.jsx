import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import User from "../user/User";
import { publicRequest } from "../../requestMethods";
import { useSelector } from "react-redux";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const user = useSelector((state) => state.users.currentUser);

  useEffect(() => {
    const fetchPerson = async () => {
      const getAllUser = await publicRequest.get("user");
      setPersons(getAllUser.data);
    };
    fetchPerson();
  }, []);
  return (
    <div className="followersCard">
      <h3>People you may know</h3>
      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return (
            <User
              person={person}
              key={id}
            />
          );
        }
      })}
    </div>
  );
};

export default FollowersCard;
