import { action, observable } from "mobx";
import { autobind } from "core-decorators";
import Login from "../../assets/api/Login";
import Profile from "../../assets/api/Profile";
import { LoginResponse, ProfileResponse } from "../../util/types/Response";
import UserType from "../../util/types/User";
import axios from "axios";

@autobind
class UserStore {
  @observable admin: boolean = false;
  @observable login: boolean = false;

  @observable user: UserType = <UserType>{};

  @action
  handleLogin = async (code: string): Promise<LoginResponse> => {
    try {
      const response: LoginResponse = await Login.GitHubLogin(code);
      axios.defaults.headers.common["access_token"] =
        response.data["access_token"];
      this.handleMyProfile();

      if (response.status === 200) {
        this.login = true;
      }

      return new Promise(
        (resolve: (response: LoginResponse) => void, reject) => {
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
  handleAdminState(state: boolean) {
    this.admin = state;
  }

  @action
  handleLoginState(state: boolean) {
    this.login = state;
  }

  @action
  handleMyProfile = async (): Promise<ProfileResponse> => {
    try {
      const response: ProfileResponse = await Profile.GetMyProfile();

      if (response["status"] === 200) {
        this.user = response.data.user;
        this.admin = response.data.user.is_admin;
        this.login = true;
      }

      return new Promise(
        (resolve: (Response: ProfileResponse) => void, reject) => {
          resolve(response);
        }
      );
    } catch (error) {
      this.admin = false;
      return new Promise((resolve, reject: (error: Error) => void) => {
        reject(error);
      });
    }
  };

  @action
  handleAdminProfile = async (): Promise<ProfileResponse> => {
    try {
      const response: ProfileResponse = await Profile.GetAdminProfile();

      return new Promise(
        (resolve: (response: ProfileResponse) => void, reject) => {
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

export default UserStore;
