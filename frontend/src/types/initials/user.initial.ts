import IUser from "types/user.type";

export const initialUserState: IUser = {
  idx: 0,
  avatar: "",
  id: "",
  name: "",
  bio: "",
  is_admin: false,
  created_at: new Date(),
};
