import React, { useCallback, useEffect, useRef, useState } from "react";
import useClose from "hooks/util/useClose";
import useUpload from "hooks/util/useUpload";

const useToolBar = (
  contentEl: React.MutableRefObject<HTMLTextAreaElement>,
  onChangeRequest: (name: string, value: any) => void
) => {
  const { imageEl, uploadHandler } = useUpload();

  const [link, setLink] = useState<string>("");
  const [isInputMount, setIsInputMount] = useState<boolean>(false);

  const linkInputEl = useRef<HTMLInputElement>(null);
  const clickEl = useRef<HTMLDivElement>(null);
  const linkEl = useRef<HTMLDivElement>(null);

  const setSelectionPos = useCallback(
    (start: number, end: number) => {
      const { current } = contentEl;
      setTimeout(() => {
        current.focus();
        current.setSelectionRange(start, end);
        current.scrollIntoView({ block: "end" });
      }, 0);
    },
    [contentEl]
  );

  const linkFocusHandler = useCallback(() => {
    const { current } = linkInputEl;
    setTimeout(() => {
      current.focus();
    }, 0);
  }, [linkInputEl]);

  const linkMountHandler = useCallback(() => {
    setIsInputMount(true);
    linkFocusHandler();
  }, [setIsInputMount, linkFocusHandler]);

  const changeLinkHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setLink(value);
    },
    [setLink]
  );

  const changeContentHandler = useCallback(
    (value: string) => {
      onChangeRequest("content", value);
    },
    [onChangeRequest]
  );

  const closeLinkHandler = useCallback(() => {
    setIsInputMount(false);
    setLink("");
  }, [setLink, setIsInputMount]);

  useClose<HTMLDivElement>(clickEl, linkEl, closeLinkHandler);

  const submitLinkHandler = useCallback(() => {
    const { current } = contentEl;

    const startPos: number = current.selectionStart;
    const endPos: number = current.selectionEnd;

    const content: string = current.value;

    const textBefore: string = content.substring(0, startPos);
    const textAfter: string = content.substring(endPos);

    const selected: string = content.substring(startPos, endPos);

    let linkText: string = selected;

    if (linkText.length === 0) {
      linkText = "링크 텍스트";
    }

    changeContentHandler(`${textBefore}[${linkText}](${link})${textAfter}`);
    setSelectionPos(startPos + 1, startPos + linkText.length + 1);
    setLink("");
    setIsInputMount(false);
  }, [link, contentEl, changeContentHandler, setSelectionPos, setIsInputMount]);

  const linkKeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const pressed: string = e.key;

      if (pressed === "Enter") {
        e.preventDefault();
        submitLinkHandler();
      }
    },
    [submitLinkHandler]
  );

  const changeImageHandler = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
      const { files } = e.target;

      const { current } = contentEl;

      const startPos: number = current.selectionStart;
      const endPos: number = current.selectionEnd;

      const content: string = current.value;

      const textBefore: string = content.substring(0, startPos);
      const textAfter: string = content.substring(endPos);

      const url: string = await uploadHandler(files);

      const imageText: string = `\n![](${url})\n`;

      changeContentHandler(`${textBefore}${imageText}${textAfter}`);
      setSelectionPos(startPos + imageText.length, startPos + imageText.length);
    },
    [contentEl, changeContentHandler, setSelectionPos, uploadHandler]
  );

  const toolsHandler = useCallback(
    (mode: string, scale?: number) => {
      const { current } = contentEl;

      const startPos: number = current.selectionStart;
      const endPos: number = current.selectionEnd;

      const content: string = current.value;

      const slicedContent: string = content.slice(0, startPos);
      const lastNewLineIdx: number = slicedContent.lastIndexOf("\n");

      // 전체의 시작부터 selection이 존재하는 부분 중에 마지막 \n의 index까지 (\n 기준 앞 부분, 전체의 앞 부분)
      const textLineBefore: string = slicedContent.slice(0, lastNewLineIdx + 1);
      // 마지막 \n의 index부터 전체의 마지막까지 (\n 기준 뒷 부분)
      const textLineAfter: string = content.slice(lastNewLineIdx + 1, content.length);

      let currentNewLineIdx: number = textLineAfter.indexOf("\n");

      if (currentNewLineIdx === -1) {
        currentNewLineIdx = textLineAfter.length;
      }

      // 뒷 부분의 시작부터 첫 \n의 index 까지 (전체의 중간 부분)
      const lineText: string = textLineAfter.slice(0, currentNewLineIdx);
      // 뒷 부분의 첫 \n의 index부터 마지막까지 (전체의 뒷 부분)
      const textLineBelow: string = textLineAfter.slice(currentNewLineIdx, textLineAfter.length);

      const textBefore: string = content.substring(0, startPos);
      const textAfter: string = content.substring(endPos);

      const selected: string = content.substring(startPos, endPos);

      // toolbar에 존재하는 많은 handler들을 하나의 object에서 key형식으로 관리
      const handlers: { [key: string]: Function } = {
        heading: () => {
          const characters: string = "#".repeat(scale);
          const posScaleDiff: number = scale + 1;

          const isHeading: boolean = /^#{1,6} /.test(lineText);

          if (isHeading) {
            const replaced: string = lineText.replace(/^#{1,6} /, `${characters} `);

            const posDiff: number = replaced.length - lineText.length;

            changeContentHandler(`${textLineBefore}${replaced}${textLineBelow}`);
            setSelectionPos(startPos + posDiff, endPos + posDiff);
            return;
          }

          changeContentHandler(`${textLineBefore}${characters} ${lineText}${textLineBelow}`);
          setSelectionPos(startPos + posScaleDiff, endPos + posScaleDiff);
        },

        bold: () => {
          const isBold: boolean = /\*\*(.*)\*\*/.test(selected);

          if (isBold) {
            const replaced: string = selected.replace(/\*\*/g, "");

            changeContentHandler(`${textBefore}${replaced}${textAfter}`);
            setSelectionPos(startPos, startPos + selected.length - 4);
            return;
          }

          if (selected.length === 0) {
            const sample: string = "텍스트";

            changeContentHandler(`${textBefore}**${sample}**${textAfter}`);
            setSelectionPos(startPos + 2, startPos + sample.length + 2);
            return;
          }

          changeContentHandler(`${textBefore}**${selected}**${textAfter}`);
          setSelectionPos(startPos, startPos + selected.length + 4);
        },

        italic: () => {
          const isItalic: boolean = /_(.*)_/.test(selected);

          if (isItalic) {
            const replaced: string = selected.replace(/_/g, "");

            changeContentHandler(`${textBefore}${replaced}${textAfter}`);
            setSelectionPos(startPos, startPos + selected.length - 2);
            return;
          }

          if (selected.length === 0) {
            const sample: string = "텍스트";

            changeContentHandler(`${textBefore}_${sample}_${textAfter}`);
            setSelectionPos(startPos + 1, startPos + sample.length + 1);
            return;
          }

          changeContentHandler(`${textBefore}_${selected}_${textAfter}`);
          setSelectionPos(startPos, startPos + selected.length + 2);
        },

        strike: () => {
          const isBold: boolean = /~~(.*)~~/.test(selected);

          if (isBold) {
            const replaced: string = selected.replace(/~~/g, "");

            changeContentHandler(`${textBefore}${replaced}${textAfter}`);
            setSelectionPos(startPos, startPos + selected.length - 4);
            return;
          }

          if (selected.length === 0) {
            const sample: string = "텍스트";

            changeContentHandler(`${textBefore}~~${sample}~~${textAfter}`);
            setSelectionPos(startPos + 2, startPos + sample.length + 2);
            return;
          }

          changeContentHandler(`${textBefore}~~${selected}~~${textAfter}`);
          setSelectionPos(startPos, startPos + selected.length + 4);
        },

        blockquote: () => {
          const isBlockQuote: boolean = /^> /.test(lineText);

          if (isBlockQuote) {
            const replaced: string = lineText.replace(/^> /, "");

            const posDiff: number = replaced.length - lineText.length;

            changeContentHandler(`${textLineBefore}${replaced}${textLineBelow}`);
            setSelectionPos(startPos + posDiff, endPos + posDiff);
            return;
          }

          changeContentHandler(`${textLineBefore}> ${lineText}${textLineBelow}`);
          setSelectionPos(startPos + 2, endPos + 2);
          return;
        },

        link: () => {
          linkMountHandler();
        },

        codeblock: () => {
          if (selected.length === 0) {
            const sample: string = "코드 입력";

            changeContentHandler(`${textBefore}\n\`\`\`\n${sample}\n\`\`\`\n${textAfter}`);
            setSelectionPos(startPos + 5, startPos + sample.length + 5);
            return;
          }

          changeContentHandler(`${textBefore}\n\`\`\`\n${selected}\n\`\`\`\n${textAfter}`);
          setSelectionPos(startPos + 5, startPos + selected.length + 5);
        },
      };

      const handler: Function = handlers[mode];
      if (!handler || (mode === "heading" && !scale)) return;

      handler();
    },
    [contentEl, changeContentHandler, setSelectionPos, linkMountHandler]
  );

  useEffect(() => {
    return () => {
      setLink("");
      setIsInputMount(false);
    };
  }, [setIsInputMount]);

  return {
    imageEl,
    clickEl,
    linkEl,
    linkInputEl,
    isInputMount,
    link,
    changeLinkHandler,
    changeImageHandler,
    submitLinkHandler,
    linkKeyDownHandler,
    toolsHandler,
  };
};

export default useToolBar;
