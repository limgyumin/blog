export interface CreatePostParams {
  title: string;
  description: string;
  content: string;
  category_idx: number;
  thumbnail?: string;
}

export interface ModifyPostParams {
  idx: number;
  title: string;
  description: string;
  content: string;
  category_idx: number;
  is_temp: boolean;
  thumbnail?: string;
}

export interface CreateTempPostParams {
  title: string;
  description?: string;
  content: string;
  category_idx?: number;
  thumbnail?: string;
}
