import removeLastBlank from "./removeLastBlank";

export default (content: string): boolean => {
  return removeLastBlank(content) === "" ? true : false;
};
