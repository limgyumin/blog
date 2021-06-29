type PostParamsType = {
  page: number;
  limit: number;
  category?: number;
};

export const AUTH = {
  GITHUB: "/auth/login",
  FCM: "/auth/fcm",
};

export const PROFILE = {
  MY: "/profile/my",
  ALL: "/profile/all",
  ADMIN: "/profile/admin",
};

export const POST = {
  CREATE: {
    ONE: "/post",
    TEMP: "/post/temp",
    LIKE: "/post/like",
  },
  GET: {
    ONE: (idx: number) => `/post/${idx}`,
    ALL: ({ page, limit, category }: PostParamsType) => {
      let url = `/post?page=${page}&limit=${limit}`;
      if (category) url += `&category=${category}`;
      return url;
    },
    OTHER: (idx: number) => `/post/other/${idx}`,
    TEMP: "/post/temp",
  },
  SEARCH: (keyword: string) => `/post/search?query=${keyword}`,
  UPDATE: (idx: number) => `/post/${idx}`,
  DELETE: (idx: number) => `/post/${idx}`,
};

export const LIKE = {
  CREATE: `/like`,
  GET: {
    INFO: (idx: number) => `/like/${idx}`,
    USERS: (idx: number) => `/like/users?post=${idx}`,
  },
};

export const CATEGORY = {
  CREATE: "/category",
  GET: {
    ALL: "/category",
    POSTS: "/category/post",
  },
  UPDATE: (idx: number) => `/category/${idx}`,
  DELETE: (idx: number) => `/category/${idx}`,
};

export const COMMENT = {
  CREATE: "/comment",
  GET: {
    ALL: (postIdx: number) => `/comment?post=${postIdx}`,
    COUNT: (idx: number) => `/post/comment/${idx}`,
  },
  UPDATE: (idx: number) => `/comment/${idx}`,
  DELETE: (idx: number) => `/comment/${idx}`,
};

export const REPLY = {
  CREATE: "/reply",
  UPDATE: (idx: number) => `/reply/${idx}`,
  DELETE: (idx: number) => `/reply/${idx}`,
};

export const FILE = {
  UPLOAD: "/upload",
};
