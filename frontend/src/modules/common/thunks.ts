import ERequest from "enum/request.enum";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { POST } from "request/requestUrl";
import { IPostsResponse, PostQueryType } from "types/post.type";
import { fetchPostsAsync } from "./actions";
import { CommonAction } from "./types";

export const fetchPostsThunk = ({
  page,
  limit,
  category,
}: PostQueryType): ThunkAction<void, RootState, void, CommonAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchPostsAsync;
    dispatch(request(category));

    try {
      const { data }: IPostsResponse = await requestApi(
        POST.GET.ALL({ page, limit, category }),
        ERequest.GET
      );

      const result = {
        total: data.post_count,
        notFound: false,
        posts: data.posts,
      };

      if (page === 1 && !data.posts.length) {
        result.notFound = true;
      }

      dispatch(success(result));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
