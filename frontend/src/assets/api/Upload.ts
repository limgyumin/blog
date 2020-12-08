import { SERVER } from "../../config/config.json";
import axios from "axios";

class Upload {
  async UploadFile(file: File) {
    try {
      const url = `${SERVER}/v1/upload`;

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await axios.post(url, formData);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Upload();
