import React from "react";
import UserType from "../../util/types/User";
import "./Members.scss";
import CountUp from "react-countup";
import MembersUserItem from "./MembersUserItem";
import { RiVipCrownFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";

interface MembersProps {
  userCount: number;
  admin: Partial<UserType>;
  users: UserType[];
}

const Members = ({ userCount, admin, users }: MembersProps) => {
  return (
    <>
      <div className="Members">
        <div className="Members-Container">
          <div className="Members-Container-Wrapper">
            <p className="Members-Container-Wrapper-Title">이 블로그의 멤버</p>
            <p className="Members-Container-Wrapper-Subtitle">
              현재{" "}
              <span>
                <CountUp end={userCount + 1} duration={2.75} separator="," />
              </span>
              명이 함께하고 있어요!
            </p>
          </div>
          <div className="Members-Container-Admin">
            <p className="Members-Container-Admin-Title">
              <RiVipCrownFill />
              관리자
            </p>
            <MembersUserItem user={admin} />
          </div>
          <div className="Members-Container-List">
            <p className="Members-Container-List-Title">
              <BsFillPersonFill />
              멤버
            </p>
            {users.map((user, idx) => (
              <React.Fragment key={idx}>
                <MembersUserItem user={user} />
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Members;
