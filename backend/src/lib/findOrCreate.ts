import "dotenv/config";
import { getRepository } from "typeorm";
import User from "../entity/User";
import UserDataType from "../type/UserDataType";

export default async (data: UserDataType): Promise<User> => {
  const { ADMIN_ID } = process.env;
  const userRepo = getRepository(User);
  let user: User = await userRepo.findOne({
    where: {
      id: data.id,
    },
  });

  if (user) {
    return user;
  }

  user = new User();

  if (data.id === ADMIN_ID) user.is_admin = true;

  user.avatar = data.avatar;
  user.id = data.id;
  user.name = data.name || data.id;
  user.bio = data.bio;

  return userRepo.save(user);
};
