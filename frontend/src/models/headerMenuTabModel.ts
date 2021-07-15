export interface IHeaderMenuTab {
  label: string;
  path: string;
}

export const headerMenuTabModel: IHeaderMenuTab[] = [
  {
    label: "피드",
    path: "/",
  },
  {
    label: "카테고리",
    path: "/categories",
  },
  {
    label: "멤버",
    path: "/members",
  },
  {
    label: "소개",
    path: "/about",
  },
];
