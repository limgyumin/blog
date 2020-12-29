import React from "react";
import { ReactComponent as Like } from "../../../assets/images/like.svg";
import { FaTrash, FaPen } from "react-icons/fa";
import getTimeCount from "../../../util/lib/getTimeCount";
import PostLike from "../PostLike";
import "./PostHeader.scss";

interface PostHeaderProps {
  title: string;
  writer: string;
  categoryName: string;
  createdAt: Date;
  thumbnail: string;
  handlePostLikeCallback: () => Promise<void>;
  showModalCallback: () => void;
  modifyClickHandler: () => void;
  likeCount: number;
  liked: boolean;
  admin: boolean;
}

const PostHeader = ({
  title,
  writer,
  categoryName,
  createdAt,
  thumbnail,
  handlePostLikeCallback,
  showModalCallback,
  modifyClickHandler,
  likeCount,
  liked,
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
              <div
                className={
                  liked
                    ? "Post-Header-Container-Category-Right-Like-Active Post-Header-Container-Category-Right-Like"
                    : "Post-Header-Container-Category-Right-Like"
                }
                onClick={handlePostLikeCallback}
              >
                <Like
                  className={
                    liked
                      ? "Post-Header-Container-Category-Right-Like-Button-Active Post-Header-Container-Category-Right-Like-Button"
                      : "Post-Header-Container-Category-Right-Like-Button"
                  }
                />
                <span
                  className={
                    liked
                      ? "Post-Header-Container-Category-Right-Like-Count-Active Post-Header-Container-Category-Right-Like-Count"
                      : "Post-Header-Container-Category-Right-Like-Count"
                  }
                >
                  {likeCount}
                </span>
              </div>
              {admin && (
                <div className="Post-Header-Container-Category-Right-Control">
                  <FaPen onClick={() => modifyClickHandler()} />
                  <FaTrash onClick={() => showModalCallback()} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="Post-Header-Like">
          <PostLike
            handlePostLikeCallback={handlePostLikeCallback}
            likeCount={likeCount}
            liked={liked}
          />
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
