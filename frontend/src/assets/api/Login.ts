import axios from "axios";
import { SERVER } from "../../config/config.json";

class Login {
  async GitHubLogin(code: string) {
    try {
      const url = `${SERVER}/v1/auth/login`;
      const body = {
        code,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async FcmToken(token: string) {
    try {
      const url = `${SERVER}/v1/auth/fcm`;
      const body = {
        token,
      };

      const { data } = await axios.post(url, body);
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Login();
