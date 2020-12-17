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
import removeLastBlank from "../../util/lib/removeLastBlank";
import isEmpty from "../../util/lib/isEmpty";
import convertURL from "../../util/lib/convertURL";
import axios from "axios";

const WriteContainer = ({}) => {
  const { store } = useStore();
  const { handleUploadFile } = store.UploadStore;
  const { handleCreatePost } = store.PostStore;
  const { categories, handleCategories } = store.CategoryStore;

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [fileName, setFileName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [categoryIdx, setCategoryIdx] = useState<number>(0);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<boolean>(false);

  const history = useHistory();

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleCategoriesCallback = useCallback(async () => {
    await handleCategories()
      .then(() => {})
      .catch((err: Error) => {
        toast.error("이런! 어딘가 문제가 있어요.");
      });
  }, []);

  const handleWritePostCallback = useCallback(async () => {
    if (isEmpty(title) || isEmpty(desc) || isEmpty(content)) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    if (isEmpty(category)) {
      toast.error("카테고리를 선택해주세요.");
      return;
    }

    let uploadFile: string = "";

    if (thumbnail) {
      await handleUploadFile(thumbnail)
        .then((res: UploadFileResponse) => {
          uploadFile = res.data.files[0];
        })
        .catch((err: Error) => {
          toast.error("이런! 이미지 업로드에 실패했어요.");
        });
    }

    await handleCreatePost(
      removeLastBlank(title),
      removeLastBlank(desc),
      removeLastBlank(content),
      categoryIdx,
      convertURL(uploadFile)
    )
      .then((res: Response) => {
        toast.success("야호! 글 작성에 성공했어요!");
        history.push("/");
      })
      .catch((err: Error) => {
        toast.error("앗! 글 작성에 실패했어요.");
        console.log(err);
      });
  }, [title, desc, content, thumbnail, categoryIdx]);

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
    }
  };

  const goToBeforePage = () => {
    history.goBack();
  };

  const writeCancelHandler = useCallback(() => {
    if (
      title !== "" ||
      desc !== "" ||
      content !== "" ||
      thumbnail !== undefined
    ) {
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

  const categoryItemHandler = (name: string, idx: number) => {
    setCategory(name);
    setCategoryIdx(idx);
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      document.execCommand("insertText", false, "\t");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      history.push("/");
    } else {
      axios.defaults.headers.common["access_token"] = localStorage.getItem(
        "access_token"
      );
    }
  }, []);

  useEffect(() => {
    handleCategoriesCallback();
  }, [handleCategoriesCallback]);

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
        categories={categories}
        category={category}
        showOption={showOption}
        setShowOption={setShowOption}
        categoryItemHandler={categoryItemHandler}
        handleWritePostCallback={handleWritePostCallback}
        keyDownHandler={keyDownHandler}
      />
    </>
  );
};

export default observer(WriteContainer);
