import { useParams } from "react-router-dom";
import { PostParamsType } from "types/post.type";

export default function usePostIdx() {
  const { idx } = useParams<PostParamsType>();

  return Number(idx);
}
