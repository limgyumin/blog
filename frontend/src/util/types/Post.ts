import UserType from "./User";

export default interface PostType {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  created_at: Date;
  category_name: string;
  fk_category_idx: number;
  is_temp: boolean;
  user: UserType;
  comment_count: number;
  like_count: number;
}
