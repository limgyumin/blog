import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";
import React, { FC } from "react";
import IUser from "types/user.type";

const styles = require("./PostLikedUserItem.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostLikedUserItemProps = {
  likedUser: IUser;
};

const PostLikedUserItem: FC<PostLikedUserItemProps> = ({ likedUser }: PostLikedUserItemProps) => {
  const { id, avatar, name, bio } = likedUser;
  return (
    <div className={cx("post-liked-user-item")}>
      <a
        className={cx("post-liked-user-item-wrap")}
        href={`https://github.com/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={avatar} alt={avatar} className={cx("post-liked-user-item-wrap-avatar")} />
        <div className={cx("post-liked-user-item-wrap-content")}>
          <p className={cx("post-liked-user-item-wrap-content-name")}>{name}</p>
          <p className={cx("post-liked-user-item-wrap-content-bio")}>{bio}</p>
        </div>
      </a>
    </div>
  );
};

export default PostLikedUserItem;
