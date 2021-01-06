import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import Members from "../../components/Members";
import useStore from "../../util/lib/hooks/useStore";
import { ProfilesResponse } from "../../util/types/Response";
import UserType from "../../util/types/User";
import { toast } from "react-toastify";

const MembersContainer = ({}) => {
  const { store } = useStore();
  const { handleProfiles } = store.UserStore;
  const [userCount, setUserCount] = useState<number>(0);
  const [users, setUsers] = useState<UserType[]>([]);

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

  useEffect(() => {
    handleProfilesCallback();
    return () => {
      setUserCount(0);
      setUsers([]);
    };
  }, [handleProfilesCallback]);

  return (
    <>
      <Members userCount={userCount} users={users} />
    </>
  );
};

export default observer(MembersContainer);
