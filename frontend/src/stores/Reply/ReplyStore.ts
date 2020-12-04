import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import Reply from "../../assets/api/Reply";
import { RepliesResponse, ReplyCountResponse } from "../../util/types/Response";

@autobind
class ReplyStore {
  // 모달 관련 State
  @observable isShow: boolean = false;
  @observable isOpen: boolean = false;

  @action
  showModal() {
    if (this.isShow) {
      setTimeout(() => {
        this.isShow = !this.isShow;
      }, 500);
    } else {
      this.isShow = !this.isShow;
    }
    this.isOpen = !this.isOpen;
  }

  @action
  handleReplyCount = async (idx: number): Promise<ReplyCountResponse> => {
    try {
      const response: ReplyCountResponse = await Reply.GetReplyCount(idx);

      return new Promise(
        (resolve: (response: ReplyCountResponse) => void, reject) => {
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
