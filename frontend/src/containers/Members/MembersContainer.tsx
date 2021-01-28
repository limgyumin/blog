import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Members from "../../components/Members";
import useStore from "../../util/lib/hooks/useStore";
import { ProfileResponse, ProfilesResponse } from "../../util/types/Response";
import UserType from "../../util/types/User";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import ReactHelmet from "../../components/common/ReactHelmet";

const MembersContainer = ({}) => {
  const { store } = useStore();
  const { handleProfiles, handleAdminProfile } = store.UserStore;
  const [userCount, setUserCount] = useState<number>(0);
  const [users, setUsers] = useState<UserType[]>([]);
  const [admin, setAdmin] = useState<Partial<UserType>>({});

  const handleProfilesCallback = useCallback(async () => {
    await handleProfiles()
      .then((res: ProfilesResponse) => {
        setUserCount(res.data["user_count"]);
        setUsers(res.data["users"]);
      })
      .catch((err: Error) => {
        toast.error("이런! 어딘가 문제가 있어요.");
      });
  }, []);

  const handleAdminProfileCallback = useCallback(async () => {
    await handleAdminProfile()
      .then((res: ProfileResponse) => {
        setAdmin(res.data.user);
      })
      .catch((err: Error) => {
        toast.error("이런! 어딘가 문제가 있어요.");
      });
  }, []);

  useEffect(() => {
    handleAdminProfileCallback();
    return () => {
      setAdmin({});
    };
  }, [handleAdminProfileCallback]);

  useEffect(() => {
    handleProfilesCallback();
    return () => {
      setUserCount(0);
      setUsers([]);
    };
  }, [handleProfilesCallback]);

  return (
    <>
      <ReactHelmet
        title="Members | Untitled"
        description="개발자를 꿈꾸는 한 학생의 이야기"
      />
      <Members userCount={userCount} admin={admin} users={users} />
    </>
  );
};

export default observer(MembersContainer);
