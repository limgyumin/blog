export default (content: string): string => {
  return content.replace(/^\s+|\s+$/g, "");
};
