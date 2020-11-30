import moment from "moment";
import React from "react";
import "./PostHeader.scss";

interface PostHeaderProps {
  title: string;
  categoryName: string;
  createdAt: Date;
  thumbnail: string;
}

const PostHeader = ({
  title,
  categoryName,
  createdAt,
  thumbnail,
}: PostHeaderProps) => {
  return (
    <>
      <div className="Post-Header">
        <div className="Post-Header-Container">
          <h1 className="Post-Header-Container-Title">{title}</h1>
          <div className="Post-Header-Container-Category">
            <div className="Post-Header-Container-Category-Name">
              {categoryName}
            </div>
            <p className="Post-Header-Container-Category-Date">
              {" · "}
              {moment(createdAt).format("YYYY년 M월 D일")}
            </p>
          </div>
        </div>
        {thumbnail && (
          <img
            src={thumbnail}
            alt="Thumbnail"
            className="Post-Header-Thumbnail"
          />
        )}
      </div>
    </>
  );
};

export default PostHeader;
