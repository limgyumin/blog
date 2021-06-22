import ERequest from "enum/request.enum";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { POST } from "request/requestUrl";
import { IPostsResponse } from "types/post.type";
import { fetchSearchedPostsAsync } from "./actions";
import { SearchAction } from "./types";

export const fetchSearchedPostsThunk = (
  keyword: string
): ThunkAction<void, RootState, void, SearchAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchSearchedPostsAsync;
    dispatch(request());

    try {
      const { data }: IPostsResponse = await requestApi(POST.SEARCH(keyword), ERequest.GET);

      const result = {
        total: data.post_count,
        notFound: false,
        posts: data.posts,
      };

      if (!data.posts.length) {
        result.notFound = true;
      }

      dispatch(success(result));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
