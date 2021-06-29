import React, { useCallback, useEffect, useRef, useState } from "react";
import { IPostDTO } from "types/post.type";
import { IWindowSize } from "types/util.type";

export default function usePostTextArea(
  request: IPostDTO,
  onChangeRequest: (name: string, value: any) => void
) {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [passed, setPassed] = useState<boolean>(false);

  const titleEl = useRef<HTMLTextAreaElement>(null);
  const contentEl = useRef<HTMLTextAreaElement>(null);

  const handleScrollContent = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight } = e.currentTarget;
    const pass: boolean = scrollTop > 0 && scrollHeight > 1000;

    setPassed(pass);
  }, []);

  const setSelectionPos = useCallback(
    (start: number, end: number) => {
      setTimeout(() => {
        contentEl.current.focus();
        contentEl.current.setSelectionRange(start, end);
      }, 0);
    },
    [contentEl]
  );

  const handleKeyDownContent = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const pressed = e.key;

      if (pressed === "Tab") {
        e.preventDefault();
        const { current } = contentEl;

        const startPos: number = current.selectionStart;
        const endPos: number = current.selectionEnd;

        const startContent: string = current.value.substring(0, startPos);
        const endContent: string = current.value.substring(startPos);

        onChangeRequest("content", `${startContent}\t${endContent}`);
        setSelectionPos(startPos + 1, endPos + 1);
      }
    },
    [contentEl, onChangeRequest, setSelectionPos]
  );

  const handleResizeWindow = useCallback((): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const handleFocusContent = useCallback((): void => {
    contentEl.current.focus();
  }, [contentEl]);

  const handleResizeTitleScroll = useCallback((): void => {
    const { current } = titleEl;

    if (current) {
      current.style.height = "0px";
      const scrollHeight: number = current.scrollHeight;
      current.style.height = scrollHeight + "px";
    }
  }, [titleEl]);

  const handleResizeContentScroll = useCallback((): void => {
    const { current } = contentEl;

    if (current) {
      current.style.height = "0px";
      const scrollHeight: number = current.scrollHeight;
      current.style.height = scrollHeight + "px";
      current.scrollIntoView({ block: "end" });
    }
  }, [contentEl]);

  useEffect(() => {
    handleResizeTitleScroll();
  }, [request.title, handleResizeTitleScroll]);

  useEffect(() => {
    handleResizeContentScroll();
  }, [request.content, windowSize, handleResizeContentScroll]);

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, [handleResizeWindow]);

  useEffect(() => {
    return () => {
      setWindowSize({ width: 0, height: 0 });
      setPassed(false);
    };
  }, []);

  return {
    passed,
    titleEl,
    contentEl,
    handleScrollContent,
    handleKeyDownContent,
    handleFocusContent,
  };
}
