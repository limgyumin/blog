import React, { FC } from "react";
import "./PostLikedUsers.scss";
import { IoIosArrowBack } from "react-icons/io";
import PostLikedUserItem from "./PostLikedUserItem";
import useFetchLikeUsers from "hooks/like/useFetchLikeUsers";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./PostLikedUsers.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostLikedUsersProps = {
  onClose: () => void;
};

const PostLikedUsers: FC<PostLikedUsersProps> = ({ onClose }) => {
  const { likeCount, likedUsers } = useFetchLikeUsers();

  return (
    <div className={cx("post-liked-users")}>
      <div className={cx("post-liked-users-header")}>
        <IoIosArrowBack onClick={onClose} />
        <p className={cx("post-liked-users-header-title")}>좋아요를 누른 유저</p>
        <p className={cx("post-liked-users-header-count")}>{likeCount}</p>
      </div>
      <div className={cx("post-liked-users-list")}>
        {likedUsers.map((likedUser, idx) => (
          <React.Fragment key={idx}>
            <PostLikedUserItem likedUser={likedUser} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PostLikedUsers;
