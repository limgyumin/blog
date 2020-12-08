import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Write from "../../components/Write";
import Portal from "../../components/common/Portal";
import ModalContainer from "../Modal/ModalContainer";
import { useHistory } from "react-router-dom";
import WriteCancelAlert from "../../components/Write/WriteCancelAlert";

const WriteContainer = ({}) => {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const history = useHistory();

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    titleRef.current!.style.height = "0px";
    const scrollHeight = titleRef.current!.scrollHeight;
    titleRef.current!.style.height = scrollHeight + "px";
  }, [title]);

  useEffect(() => {
    descRef.current!.style.height = "0px";
    const scrollHeight = descRef.current!.scrollHeight;
    descRef.current!.style.height = scrollHeight + "px";
  }, [desc]);

  useEffect(() => {
    contentRef.current!.style.height = "0px";
    const scrollHeight = contentRef.current!.scrollHeight;
    contentRef.current!.style.height = scrollHeight + "px";
  }, [content]);

  const goToBeforePage = () => {
    history.goBack();
  };

  const writeCancelHandler = useCallback(() => {
    if (title !== "" || desc !== "" || content !== "") {
      showModalCallback();
    } else {
      goToBeforePage();
    }
  }, [title, desc, content]);

  const showModalCallback = useCallback(() => {
    if (isShow) {
      setTimeout(() => {
        setIsShow(!isShow);
      }, 500);
    } else {
      setIsShow(!isShow);
    }
    setIsOpen(!isOpen);
  }, [isShow, isOpen]);

  return (
    <>
      <Portal elementId="modal-root">
        <ModalContainer isOpen={isOpen} isShow={isShow}>
          <WriteCancelAlert
            showModalCallback={showModalCallback}
            push={goToBeforePage}
          />
        </ModalContainer>
      </Portal>
      <Write
        title={title}
        setTitle={setTitle}
        titleRef={titleRef}
        desc={desc}
        setDesc={setDesc}
        descRef={descRef}
        content={content}
        setContent={setContent}
        contentRef={contentRef}
        writeCancelHandler={writeCancelHandler}
      />
    </>
  );
};

export default observer(WriteContainer);
