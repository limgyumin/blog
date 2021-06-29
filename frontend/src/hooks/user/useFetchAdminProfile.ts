import { RootState } from "modules";
import { fetchAdminProfileThunk, initUserError } from "modules/user";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function useFetchAdminProfile() {
  const { error, data } = useSelector((state: RootState) => state.users);
  const { adminProfile } = data;

  const dispatch = useDispatch();

  const handleFetchAdminProfile = useCallback(() => {
    dispatch(fetchAdminProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    handleFetchAdminProfile();
  }, [handleFetchAdminProfile]);

  useEffect(() => {
    if (error && error.response) {
      if (error.response.status !== 400) {
        toast.error("관리자 프로필 부분에서 오류가 발생했어요!");
      }
      dispatch(initUserError());
    }
  }, [error, dispatch]);

  return {
    adminProfile,
  };
}
