import React from "react";
import moment from "moment";
import "./MainFixedPost.scss";
import { ReactComponent as Chat } from "../../../../assets/images/chat.svg";
import { ReactComponent as Like } from "../../../../assets/images/like.svg";
import { ReactComponent as Pin } from "../../../../assets/images/pin.svg";
import PostType from "../../../../util/types/Post";
import { Link } from "react-router-dom";

interface MainFixedPostProps {
  fixedPost: PostType;
}

const MainFixedPost = ({ fixedPost }: MainFixedPostProps) => {
  return (
    <>
      <Link to={`/post/${fixedPost.idx}`} className="Main-Fixed-Post">
        {fixedPost.thumbnail && (
          <div className="Main-Fixed-Post-Thumbnail">
            <img
              src={fixedPost.thumbnail}
              alt="Thumbnail"
              className="Main-Fixed-Post-Thumbnail-Image"
            />
          </div>
        )}
        <div className="Main-Fixed-Post-Area">
          <div className="Main-Fixed-Post-Area-Content">
            <div className="Main-Fixed-Post-Area-Content-Category">
              <Pin />
              <span>{fixedPost.category_name}</span>
              {" · "}
              {moment(fixedPost.created_at).format("YYYY년 M월 D일")}
            </div>
            <span className="Main-Fixed-Post-Area-Content-Title">
              {fixedPost.title}
            </span>
            <span className="Main-Fixed-Post-Area-Content-Description">
              {fixedPost.description}
            </span>
          </div>
          <div className="Main-Fixed-Post-Area-Information">
            <div className="Main-Fixed-Post-Area-Information-Profile">
              <img
                className="Main-Fixed-Post-Area-Information-Profile-Avatar"
                src={fixedPost.user_avatar}
                alt={fixedPost.user_avatar}
              />
              <span className="Main-Fixed-Post-Area-Information-Profile-Name">
                <span>by </span>
                {fixedPost.user_name}
              </span>
            </div>
            <div className="Main-Fixed-Post-Area-Information-Count">
              <div className="Main-Fixed-Post-Area-Information-Count-Comment">
                <Chat />
                <span>{fixedPost.comment_count}</span>
              </div>
              <div className="Main-Fixed-Post-Area-Information-Count-Like">
                <Like />
                <span>{fixedPost.like_count}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MainFixedPost;
