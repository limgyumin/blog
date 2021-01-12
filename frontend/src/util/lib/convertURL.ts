export default (url: string | undefined) => {
  if (url) {
    return url.substring(url.lastIndexOf("/") + 1);
  } else {
    return url;
  }
};
