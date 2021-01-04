import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
import getTimeCount from "../../../util/lib/getTimeCount";
import "./PostHeader.scss";

interface PostHeaderProps {
  title: string;
  writer: string;
  categoryName: string;
  createdAt: Date;
  thumbnail: string;
  showModalCallback: () => void;
  modifyClickHandler: () => void;
  admin: boolean;
}

const PostHeader = ({
  title,
  writer,
  categoryName,
  createdAt,
  thumbnail,
  showModalCallback,
  modifyClickHandler,
  admin,
}: PostHeaderProps) => {
  return (
    <>
      <div className="Post-Header">
        <div className="Post-Header-Container">
          <h1 className="Post-Header-Container-Title">{title}</h1>
          <div className="Post-Header-Container-Category">
            <div className="Post-Header-Container-Category-Wrapper">
              {categoryName && (
                <div className="Post-Header-Container-Category-Wrapper-Name">
                  {categoryName}
                </div>
              )}
              <p className="Post-Header-Container-Category-Wrapper-Info">
                <span>{writer}</span>
                {" · "}
                {getTimeCount(createdAt)}
              </p>
            </div>
            <div className="Post-Header-Container-Category-Right">
              {admin && (
                <div className="Post-Header-Container-Category-Right-Control">
                  <FaPen onClick={() => modifyClickHandler()} />
                  <FaTrash onClick={() => showModalCallback()} />
                </div>
              )}
            </div>
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
