import axios from "axios";
import { SERVER } from "../../config/config.json";
import {
  CreatePostParams,
  CreateTempPostParams,
  ModifyPostParams,
} from "../../util/types/PostParams";

interface PostParamsType {
  page: number;
  limit: number;
  category?: number;
}

class Post {
  async CreatePost(post: CreatePostParams) {
    try {
      const url = `${SERVER}/v1/post`;

      const body = {
        title: post.title,
        description: post.description,
        content: post.content,
        thumbnail: post.thumbnail || null,
        category_idx: post.category_idx,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async CreateTempPost(post: CreateTempPostParams) {
    try {
      const url = `${SERVER}/v1/post/temp`;

      const body = {
        title: post.title,
        description: post.description,
        content: post.content,
        category_idx: post.category_idx,
        thumbnail: post.thumbnail,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPosts(query: PostParamsType) {
    try {
      let url = `${SERVER}/v1/post?page=${query.page}&limit=${query.limit}`;

      if (query.category) {
        url += `&category=${query.category}`;
      }

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetPost(idx: number) {
    try {
      const url = `${SERVER}/v1/post/${idx}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async ModifyPost(post: ModifyPostParams) {
    try {
      const url = `${SERVER}/v1/post/${post.idx}`;

      const body = {
        title: post.title,
        description: post.description,
        content: post.content,
        thumbnail: post.thumbnail,
        is_temp: post.is_temp,
        category_idx: post.category_idx,
      };

      const { data } = await axios.put(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async DeletePost(idx: number) {
    try {
      const url = `${SERVER}/v1/post/${idx}`;

      const { data } = await axios.delete(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetOtherPosts(idx: number) {
    try {
      const url = `${SERVER}/v1/post/other/${idx}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async SearchPost(query: string) {
    try {
      const url = `${SERVER}/v1/post/search?query=${query}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async PostLike(post_idx: number) {
    try {
      const url = `${SERVER}/v1/like`;
      const body = {
        post_idx,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async GetLikeInfo(idx: number) {
    try {
      const url = `${SERVER}/v1/like/${idx}`;

      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Post();
