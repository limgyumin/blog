import { getRepository } from "typeorm";
import User from "../entity/User";

export default async (id: string, name: string): Promise<User> => {
  const userRepo = getRepository(User);

  let user: User = await userRepo.findOne({ id: id });
  if (user) {
    return user;
  }

  user = new User();

  user.id = id;
  user.name = name;

  return userRepo.save(user);
};
