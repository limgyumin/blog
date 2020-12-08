import { autobind } from "core-decorators";
import { action, observable } from "mobx";
import Upload from "../../assets/api/Upload";
import { UploadFileResponse } from "../../util/types/Response";

@autobind
class UploadStore {
  @action
  handleUploadFile = async (file: File): Promise<UploadFileResponse> => {
    try {
      const response: UploadFileResponse = await Upload.UploadFile(file);

      return new Promise(
        (resolve: (response: UploadFileResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };
}

export default UploadStore;
