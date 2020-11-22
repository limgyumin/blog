import axios from "axios";
import { SERVER } from "../../config/config.json";

class Profile {
  async GetMyProfile() {
    try {
      const url = `${SERVER}/v1/profile/my`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}

export default new Profile();
