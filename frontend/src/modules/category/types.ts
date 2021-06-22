import { AxiosError } from "axios";
import { ICategory, ICategoryPosts } from "types/category.type";
import { IResponse } from "types/response.type";
import { ActionType } from "typesafe-actions";
import * as actions from "./actions";

export type CategoryAction = ActionType<typeof actions>;

export type CategoryState = {
  loading: boolean;
  error: AxiosError<IResponse> | null;
  data: {
    totalPostCount: number;
    categories: ICategory[];
    categoryPosts: ICategoryPosts[];
  };
};
