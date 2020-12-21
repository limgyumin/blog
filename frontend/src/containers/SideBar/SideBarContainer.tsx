import React, { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react";
import SideBar from "../../components/common/SideBar";
import useStore from "../../util/lib/hooks/useStore";
import { ProfileResponse } from "../../util/types/Response";
import { toast } from "react-toastify";
import UserType from "../../util/types/User";

const SideBarContainer = ({}) => {
  const { store } = useStore();
  const { handleAdminProfile } = store.UserStore;

  const [admin, setAdmin] = useState<Partial<UserType>>({});

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
  }, [handleAdminProfileCallback]);

  return (
    <>
      <SideBar
        avatar={admin.avatar!}
        id={admin.id!}
        name={admin.name!}
        bio={admin.bio!}
      />
    </>
  );
};

export default observer(SideBarContainer);
