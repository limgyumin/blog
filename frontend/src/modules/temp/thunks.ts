import ERequest from "enum/request.enum";
import { RootState } from "modules";
import { ThunkAction } from "redux-thunk";
import { requestApi } from "request/requestApi";
import { POST } from "request/requestUrl";
import { IPostsResponse } from "types/post.type";
import { fetchTempPostsAsync } from "./actions";
import { TempAction } from "./types";

export const fetchTempPostsThunk = (): ThunkAction<void, RootState, void, TempAction> => {
  return async (dispatch) => {
    const { request, success, failure } = fetchTempPostsAsync;
    dispatch(request());

    try {
      const { data }: IPostsResponse = await requestApi(POST.GET.TEMP, ERequest.GET);

      dispatch(success(data.posts));
    } catch (err) {
      dispatch(failure(err));
    }
  };
};
