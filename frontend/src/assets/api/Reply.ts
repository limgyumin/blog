import { SERVER } from "../../config/config.json";
import axios from "axios";

class Reply {
  async CreateReply(comment_idx: number, content: string) {
    try {
      const url = `${SERVER}/v1/reply`;

      const body = {
        content,
        comment_idx,
      };

      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetReplies(comment: number) {
    try {
      const url = `${SERVER}/v1/reply?comment=${comment}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async ModifyReply(idx: number, content: string) {
    try {
      const url = `${SERVER}/v1/reply/${idx}`;

      const body = {
        content,
      };

      const { data } = await axios.put(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async DeleteReply(idx: number) {
    try {
      const url = `${SERVER}/v1/reply/${idx}`;

      const { data } = await axios.delete(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Reply();
