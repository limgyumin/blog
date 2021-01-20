import React from "react";
import UserType from "../../../util/types/User";
import "./PostLikedUsers.scss";
import { IoIosArrowBack } from "react-icons/io";
import PostLikedUserItem from "./PostLikedUserItem";

interface PostLikedUsersProps {
  likeCount: number;
  likedUsers: UserType[];
  showModalCallback: () => void;
}

const PostLikedUsers = ({
  likeCount,
  likedUsers,
  showModalCallback,
}: PostLikedUsersProps) => {
  return (
    <>
      <div className="Post-Liked-Users">
        <div className="Post-Liked-Users-Header">
          <IoIosArrowBack onClick={() => showModalCallback()} />
          <p className="Post-Liked-Users-Header-Title">좋아요를 누른 유저</p>
          <p className="Post-Liked-Users-Header-Count">{likeCount}</p>
        </div>
        <div className="Post-Liked-Users-List">
          {likedUsers.map((likedUser, idx) => (
            <React.Fragment key={idx}>
              <PostLikedUserItem
                avatar={likedUser.avatar}
                id={likedUser.id}
                name={likedUser.name}
                bio={likedUser.bio}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default PostLikedUsers;
