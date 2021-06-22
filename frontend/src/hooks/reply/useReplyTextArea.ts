import { useCallback, useEffect, useRef } from "react";

export default function useReplyTextArea(content: string) {
  const replyTextAreaEl = useRef<HTMLTextAreaElement>(null);

  const increaseContentScrollHandler = useCallback(() => {
    const { current } = replyTextAreaEl;
    if (current) {
      current.style.height = "0px";
      const scrollHeight = current.scrollHeight;
      current.style.height = scrollHeight + "px";
    }
  }, [replyTextAreaEl]);

  useEffect(() => {
    increaseContentScrollHandler();
  }, [content, increaseContentScrollHandler]);

  return {
    replyTextAreaEl,
  };
}
