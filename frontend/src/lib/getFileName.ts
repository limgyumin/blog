export default (url: string | undefined) => {
  return url ? url.substring(url.lastIndexOf("/") + 1) : url;
};
