import { SERVER } from "../../config/config.json";
import axios from "axios";

class Comment {
  async GetCommentCount(idx: number) {
    try {
      const url = `${SERVER}/v1/post/comment/${idx}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async CreateComment(post_idx: number, content: string) {
    try {
      const url = `${SERVER}/v1/comment`;

      const body = {
        post_idx,
        content,
      };

      const { data } = await axios.post(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetComments(post: number) {
    try {
      const url = `${SERVER}/v1/comment?post=${post}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async ModifyComment(idx: number, content: string) {
    try {
      const url = `${SERVER}/v1/comment/${idx}`;

      const body = {
        content,
      };

      const { data } = await axios.put(url, body);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async DeleteComment(idx: number) {
    try {
      const url = `${SERVER}/v1/comment/${idx}`;

      const { data } = await axios.delete(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Comment();
