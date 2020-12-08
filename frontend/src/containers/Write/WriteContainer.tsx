import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Write from "../../components/Write";
import Portal from "../../components/common/Portal";
import ModalContainer from "../Modal/ModalContainer";
import { useHistory } from "react-router-dom";
import WriteCancelAlert from "../../components/Write/WriteCancelAlert";
import useStore from "../../util/lib/hooks/useStore";
import { UploadFileResponse } from "../../util/types/Response";
import { toast } from "react-toastify";

const WriteContainer = ({}) => {
  const { store } = useStore();
  const { handleUploadFile } = store.UploadStore;
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [fileName, setFileName] = useState<string>("");

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const history = useHistory();

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleWritePostCallback = useCallback(async () => {
    let uploadedFile: string = "";
    if (thumbnail) {
      await handleUploadFile(thumbnail)
        .then((res: UploadFileResponse) => {
          uploadedFile = res.data.files[0];
          console.log(uploadedFile);
        })
        .catch((err: Error) => {
          toast.error("이런! 이미지 업로드에 실패했어요.");
        });
    }
  }, [title, desc, content, thumbnail]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let reader = new FileReader();
    if (e.target.files && e.target.files.length) {
      let file = e.target.files[0];
      setThumbnail(file);
      reader.onloadend = () => {
        setPreview(reader.result);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

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

  const clearImageHandler = () => {
    setThumbnail(undefined);
    setPreview("");
    setFileName("");
  };

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
        handleImageChange={handleImageChange}
        preview={preview}
        fileName={fileName}
        clearImageHandler={clearImageHandler}
      />
    </>
  );
};

export default observer(WriteContainer);
