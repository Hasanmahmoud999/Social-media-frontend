import React, { useState } from "react";
import "./ProfileModale.css";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";
import { publicRequest } from "../../requestMethods";

const ProfileModale = ({ modaleOpened, setModaleOpened, data }) => {
  const { user, isFetching } = useSelector((state) => state.users);
  const TOKEN = useSelector((state) => state.users.token);
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onImageChange = (e) => {
    if (e.target.value && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profileimage" ?
        setProfileImage(img)
      : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const filename = Date.now() + profileImage.name;
      data.append("name", filename);
      data.append("file", profileImage);
      UserData.profilePicture = filename;
      try {
        await publicRequest.post("upload/", data);
      } catch (error) {
        console.log(error);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const filename = Date.now() + coverImage.name;
      data.append("name", filename);
      data.append("file", coverImage);
      UserData.coverPicture = filename;
      try {
        await publicRequest.post("upload/", data);
      } catch (error) {
        console.log(error);
      }
    }
    updateUser(param.id, UserData, dispatch, TOKEN);
    setModaleOpened(false);
  };

  return (
    <div className={modaleOpened ? "profileModale open" : "profileOpened"}>
      <div className="profileInfo">
        <span>
          <UilTimes
            style={{ cursor: "pointer" }}
            onClick={() => setModaleOpened(false)}
          />
        </span>
        <form className="infoForm">
          <h3>Your Info</h3>

          <div>
            <input
              type="text"
              className="infoInput"
              name="firstname"
              placeholder="First Name"
              onChange={handleInputChange}
              value={formData.firstname}
            />
            <input
              type="text"
              className="infoInput"
              name="lastname"
              placeholder="Last Name"
              onChange={handleInputChange}
              value={formData.lastname}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="worksAt"
              placeholder="Works at"
              onChange={handleInputChange}
              value={formData.workAt}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              name="livesin"
              placeholder="Lives in"
              onChange={handleInputChange}
              value={formData.livesin}
            />
            <input
              type="text"
              className="infoInput"
              name="country"
              placeholder="Country"
              onChange={handleInputChange}
              value={formData.country}
            />
          </div>
          <div>
            <input
              type="text"
              className="infoInput"
              placeholder="RelationShip Status"
              name="relationship"
              onChange={handleInputChange}
              value={formData.relationship}
            />
          </div>
          <div>
            Profile Image
            <input
              type="file"
              name="profileimage"
              onChange={onImageChange}
            />
            Cover Image
            <input
              type="file"
              name="coverImage"
              onChange={onImageChange}
            />
          </div>
          <button
            className="button infoButton"
            onClick={handleSubmit}
            disabled={loading}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileModale;
