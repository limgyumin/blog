import "dotenv/config";
import { getRepository } from "typeorm";
import User from "../entity/User";

export default async (id: string, name: string): Promise<User> => {
  const { ADMIN_ID } = process.env;
  const userRepo = getRepository(User);
  let user: User = await userRepo.findOne({ where: { id } });

  if (user) {
    return user;
  }

  user = new User();

  if (id === ADMIN_ID) user.is_admin = true;

  user.id = id;
  user.name = name;

  return userRepo.save(user);
};
