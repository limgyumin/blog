import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import Reply from "../../assets/api/Reply";
import ReplyType from "../../util/types/Reply";
import { RepliesResponse } from "../../util/types/Response";

@autobind
class ReplyStore {
  @observable replies: ReplyType[] = [];

  @action
  handleCreateReply = async (
    idx: number,
    content: string
  ): Promise<Response> => {
    try {
      const response: Response = await Reply.CreateReply(idx, content);

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
  handleReplies = async (comment: number): Promise<RepliesResponse> => {
    try {
      const response: RepliesResponse = await Reply.GetReplies(comment);
      this.replies = response.data.replies;

      return new Promise(
        (resolve: (response: RepliesResponse) => void, reject) => {
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
  handleModifyReply = async (
    idx: number,
    content: string
  ): Promise<Response> => {
    try {
      const response: Response = await Reply.ModifyReply(idx, content);

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
  handleDeleteReply = async (idx: number): Promise<Response> => {
    try {
      const response: Response = await Reply.DeleteReply(idx);

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

export default ReplyStore;
