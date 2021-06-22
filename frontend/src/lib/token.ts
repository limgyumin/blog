const token = {
  set: (accessToken: string): void => {
    localStorage.setItem("access_token", accessToken);
  },
  get: (): string | undefined => {
    return localStorage.getItem("access_token");
  },
  remove: (): void => {
    localStorage.removeItem("access_token");
  },
};

export default token;
