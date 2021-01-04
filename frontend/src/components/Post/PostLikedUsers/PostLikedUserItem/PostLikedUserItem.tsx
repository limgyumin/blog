import React from "react";
import "./PostLikedUserItem.scss";

interface PostLikedUserItemProps {
  avatar: string;
  name: string;
  bio: string;
}

const PostLikedUserItem = ({ avatar, name, bio }: PostLikedUserItemProps) => {
  return (
    <>
      <div className="Post-Liked-User-Item">
        <img
          src={avatar}
          alt={avatar}
          className="Post-Liked-User-Item-Avatar"
        />
        <div className="Post-Liked-User-Item-Content">
          <p className="Post-Liked-User-Item-Content-Name">{name}</p>
          <p className="Post-Liked-User-Item-Content-Bio">{bio}</p>
        </div>
      </div>
    </>
  );
};

export default PostLikedUserItem;
