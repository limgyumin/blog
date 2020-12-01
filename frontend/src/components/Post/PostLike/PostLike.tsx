import React from "react";
import "./PostLike.scss";
import { ReactComponent as Like } from "../../../assets/images/like.svg";

interface PostLikeProps {
  handlePostLikeCallback: () => Promise<void>;
  likeCount: number;
  liked: boolean;
}

const PostLike = ({
  handlePostLikeCallback,
  likeCount,
  liked,
}: PostLikeProps) => {
  return (
    <>
      <div className="Post-Like">
        <div
          className={
            liked ? "Post-Like-Area-Active Post-Like-Area" : "Post-Like-Area"
          }
          onClick={() => {
            handlePostLikeCallback();
          }}
        >
          <Like
            className={
              liked
                ? "Post-Like-Area-Button-Active Post-Like-Area-Button"
                : "Post-Like-Area-Button"
            }
          />
          <span
            className={
              liked
                ? "Post-Like-Area-Count-Active Post-Like-Area-Count"
                : "Post-Like-Area-Count"
            }
          >
            {likeCount}
          </span>
        </div>
      </div>
    </>
  );
};

export default PostLike;
