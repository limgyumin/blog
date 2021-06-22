export default function removeElTag(content: string): string {
  return content
    .replace(/ +/g, " ")
    .replace(
      /#+ |-+ |!+\[+.*\]+\(+.*\)|`|>+ |\[!+\[+.*\]+\(+.*\)|<br+.*>|\[.*\]\(.*\)/g,
      ""
    );
}
