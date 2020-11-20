import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Login from "../../assets/api/Login";
import Profile from "../../assets/api/Profile";
import { GetProfileResponse } from "../../util/types/Response";

@autobind
class UserStore {
  @observable admin: boolean = false;
  @observable login: boolean = false;

  @action
  handleLogin = async (code: string) => {
    try {
      const response = await Login.GitHubLogin(code);
      this.handleProfile(response.data.access_token);

      if (response.status === 200) {
        this.login = true;
      }

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      return new Promise((resolve, reject) => {
        reject(new Error(`${error}`));
      });
    }
  };

  @action
  handleLoginState(state: boolean) {
    this.login = state;
  }

  @action
  handleProfile = async (access_token: string): Promise<GetProfileResponse> => {
    try {
      const response: GetProfileResponse = await Profile.GetProfile(
        access_token
      );

      this.admin = response.data.user.is_admin;
      this.login = true;

      return new Promise((resolve, reject) => {
        resolve(response);
      });
    } catch (error) {
      this.admin = false;
      return new Promise((resolve, reject) => {
        reject(new Error(`${error}`));
      });
    }
  };
}

export default UserStore;
