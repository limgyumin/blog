import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import Comment from "../../assets/api/Comment";
import {
  CommentCountResponse,
  CommentsResponse,
} from "../../util/types/Response";

@autobind
class CommentStore {
  @action
  handleCommentCount = async (idx: number): Promise<CommentCountResponse> => {
    try {
      const response: CommentCountResponse = await Comment.GetCommentCount(idx);

      return new Promise(
        (resolve: (response: CommentCountResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handleCreateComment = async (
    idx: number,
    content: string
  ): Promise<Response> => {
    try {
      const response: Response = await Comment.CreateComment(idx, content);

      return new Promise((resolve: (response: Response) => void, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handleComments = async (post: number): Promise<CommentsResponse> => {
    try {
      const response: CommentsResponse = await Comment.GetComments(post);

      return new Promise(
        (resolve: (response: CommentsResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handleModifyComment = async (
    idx: number,
    content: string
  ): Promise<Response> => {
    try {
      const response: Response = await Comment.ModifyComment(idx, content);

      return new Promise((resolve: (response: Response) => void, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handleDeleteComment = async (idx: number): Promise<Response> => {
    try {
      const response: Response = await Comment.DeleteComment(idx);

      return new Promise((resolve: (response: Response) => void, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default CommentStore;
