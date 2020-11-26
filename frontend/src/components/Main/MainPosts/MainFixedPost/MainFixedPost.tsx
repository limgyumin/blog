import React from "react";
import moment from "moment";
import "./MainFixedPost.scss";
import { ReactComponent as Chat } from "../../../../assets/images/chat.svg";
import { ReactComponent as Like } from "../../../../assets/images/like.svg";
import PostType from "../../../../util/types/Post";

interface MainFixedPostProps {
  fixedPost: PostType;
}

const MainFixedPost = ({ fixedPost }: MainFixedPostProps) => {
  return (
    <>
      {fixedPost.idx && (
        <div className="Main-Fixed-Post">
          {/* {fixedPost.thumbnail && (
            <img src={fixedPost.thumbnail} alt={fixedPost.title} />
          )} */}
          <div className="Main-Fixed-Post-Thumbnail">
            <div className="Main-Fixed-Post-Thumbnail-Image" />
          </div>
          <div className="Main-Fixed-Post-Area">
            <div className="Main-Fixed-Post-Area-Content">
              <span className="Main-Fixed-Post-Area-Content-Category">
                <span>{fixedPost.category_name}</span> ·{" "}
                {moment(fixedPost.created_at).format("YYYY년 MM월 DD일")}
              </span>
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
        </div>
      )}
    </>
  );
};

export default MainFixedPost;
