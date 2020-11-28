export default interface PostType {
  idx: number;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  created_at: Date;
  category_name: string;
  user_avatar: string;
  user_name: string;
  comment_count: number;
  like_count: number;
  is_fixed: boolean;
  fk_category_idx: number;
}
