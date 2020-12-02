import React from "react";
import "./PostProfile.scss";
import { ReactComponent as GitHub } from "../../../assets/images/github.svg";

interface PostProfileProps {
  avatar: string;
  writer: string;
  bio: string;
  id: string;
}

const PostProfile = ({ avatar, writer, bio, id }: PostProfileProps) => {
  return (
    <>
      <div className="Post-Profile">
        <div className="Post-Profile-Container">
          <img
            src={avatar}
            alt={avatar}
            className="Post-Profile-Container-Image"
          />
          <div className="Post-Profile-Container-Info">
            <h2>{writer}</h2>
            <p>{bio}</p>
          </div>
        </div>
        <a href={`https://github.com/${id}`} target="_blank">
          <GitHub />
        </a>
      </div>
    </>
  );
};

export default PostProfile;
