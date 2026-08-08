import React, { useRef, useState } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";
import { uploadNewPost } from "../../redux/apiCalls";

const PostShare = () => {
  const serverPublic = import.meta.env.VITE_PUBLIC_FOLDER;
  const isFetching = useSelector((state) => state.posts.isFetching);
  const user = useSelector((state) => state.users.currentUser);
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleNewPost = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      try {
        //Uploading the image to the server
        await publicRequest.post("upload/", data);
      } catch (err) {
        console.log(err);
      }
    }
    uploadNewPost(newPost, dispatch);
    reset();
  };

  return (
    <div className="postShare">
      <img
        src={
          user.profilePicture ?
            serverPublic + user.profilePicture
          : serverPublic + "defaultProfile.jpg"
        }
        alt=""
      />
      <div>
        <input
          type="text"
          required
          placeholder="what's happening"
          ref={desc}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div
            className="option"
            style={{ color: "var(--video)" }}
          >
            <UilPlayCircle />
            Video
          </div>
          <div
            className="option"
            style={{ color: "var(--location)" }}
          >
            <UilLocationPoint />
            Location
          </div>
          <div
            className="option"
            style={{ color: "var(--shedule)" }}
          >
            <UilSchedule />
            Schedule
          </div>
          <button
            className="button ps-button"
            onClick={handleNewPost}
            disabled={isFetching}
          >
            {isFetching ? "Uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img
              src={URL.createObjectURL(image)}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
