import React, { FC } from "react";
import { AiFillGithub } from "react-icons/ai";
import IUser from "types/user.type";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./PostProfile.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type PostProfileProps = {
  user: IUser;
};

const PostProfile: FC<PostProfileProps> = ({ user }) => {
  const { avatar, name, bio, id } = user;

  return (
    <div className={cx("post-profile")}>
      <div className={cx("post-profile-wrap")}>
        <img src={avatar} alt={avatar} className={cx("post-profile-wrap-image")} />
        <div className={cx("post-profile-wrap-info")}>
          <h2>{name}</h2>
          <p>{bio}</p>
        </div>
      </div>
      <a
        className={cx("post-profile-github")}
        href={`https://github.com/${id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AiFillGithub className={cx("post-profile-github-icon")} />
      </a>
    </div>
  );
};

export default PostProfile;
