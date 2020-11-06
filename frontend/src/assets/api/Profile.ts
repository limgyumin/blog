import axios from "axios";
import { SERVER } from "../../config/config.json";

class Profile {
  async GetProfile(access_token: string) {
    try {
      const url = `${SERVER}/v1/profile`;

      const { data } = await axios.get(url, {
        headers: {
          access_token,
        },
      });
      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Profile();
