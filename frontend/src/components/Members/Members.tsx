import React from "react";
import CountUp from "react-countup";
import MembersUserItem from "./MembersUserItem";
import { RiVipCrownFill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import ReactHelmet from "components/common/ReactHelmet";
import { THUMBNAIL_URL } from "config/config.json";
import useFetchProfiles from "hooks/user/useFetchProfiles";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./Members.scss");
const cx: ClassNamesFn = classNames.bind(styles);

const Members = () => {
  const { userCount, adminProfile, profiles } = useFetchProfiles();

  return (
    <React.Fragment>
      <ReactHelmet
        title="Members | Nonamed"
        description="개발자를 꿈꾸는 한 학생의 이야기"
        url="https://nonamed.blog/members"
        image={THUMBNAIL_URL}
      />
      <div className={cx("members")}>
        <div className={cx("members-wrap")}>
          <div className={cx("members-wrap-container")}>
            <p className={cx("members-wrap-container-title")}>이 블로그의 멤버</p>
            <p className={cx("members-wrap-container-subtitle")}>
              와우! 현재{" "}
              <span>
                <CountUp end={userCount + 1} duration={2.75} separator="," />
              </span>
              명이 함께하고 있어요!
            </p>
          </div>
          <div className={cx("members-wrap-admin")}>
            <p className={cx("members-wrap-admin-title")}>
              <RiVipCrownFill />
              관리자
            </p>
            <MembersUserItem user={adminProfile} />
          </div>
          <div className={cx("members-wrap-list")}>
            <p className={cx("members-wrap-list-title")}>
              <BsFillPersonFill />
              멤버
            </p>
            {profiles.map((user) => (
              <MembersUserItem key={user.idx} user={user} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Members;
