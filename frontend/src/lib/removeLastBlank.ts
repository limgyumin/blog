export default function removeBlank(content: string): string {
  return content.replace(/^\s+|\s+$/g, "");
}
