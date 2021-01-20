import React from "react";
import "./PostLikedUserItem.scss";

interface PostLikedUserItemProps {
  avatar: string;
  id: string;
  name: string;
  bio: string;
}

const PostLikedUserItem = ({
  avatar,
  id,
  name,
  bio,
}: PostLikedUserItemProps) => {
  return (
    <>
      <div className="Post-Liked-User-Item">
        <a
          href={`https://github.com/${id}`}
          target="_blank"
          className="Post-Liked-User-Item-Wrapper"
        >
          <img
            src={avatar}
            alt={avatar}
            className="Post-Liked-User-Item-Wrapper-Avatar"
          />
          <div className="Post-Liked-User-Item-Wrapper-Content">
            <p className="Post-Liked-User-Item-Wrapper-Content-Name">{name}</p>
            <p className="Post-Liked-User-Item-Wrapper-Content-Bio">{bio}</p>
          </div>
        </a>
      </div>
    </>
  );
};

export default PostLikedUserItem;
