import React, { useCallback, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import Handle from "../../components/Handle";
import Portal from "../../components/common/Portal";
import ModalContainer from "../Modal/ModalContainer";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import HandleCancelAlert from "../../components/Handle/HandleCancelAlert";
import useStore from "../../util/lib/hooks/useStore";
import {
  ProfileResponse,
  PostResponse,
  UploadFileResponse,
} from "../../util/types/Response";
import { toast } from "react-toastify";
import removeLastBlank from "../../util/lib/removeLastBlank";
import isEmpty from "../../util/lib/isEmpty";
import convertURL from "../../util/lib/convertURL";
import axios from "axios";
import {
  CreatePostParams,
  CreateTempPostParams,
  ModifyPostParams,
} from "../../util/types/PostParams";
import { useBeforeunload } from "react-beforeunload";

interface HandleContainerProps extends RouteComponentProps<MatchType> {}

interface MatchType {
  idx: string;
}

const HandleContainer = ({ match }: HandleContainerProps) => {
  const { store } = useStore();
  const { handleUploadFile } = store.UploadStore;
  const {
    handlePost,
    handleCreatePost,
    handleCreateTempPost,
    handleModifyPost,
  } = store.PostStore;
  const { categories, handleCategories } = store.CategoryStore;
  const {
    login,
    admin,
    handleMyProfile,
    handleLoginState,
    handleAdminState,
  } = store.UserStore;

  const [write, setWrite] = useState<boolean>(true);

  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categoryIdx, setCategoryIdx] = useState<number>(0);

  const [preview, setPreview] = useState<string | ArrayBuffer | null>("");
  const [fileName, setFileName] = useState<string>("");
  const [uploadFile, setUploadFile] = useState<File>();

  const [category, setCategory] = useState<string>("");

  const [isShow, setIsShow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showOption, setShowOption] = useState<boolean>(false);

  const history = useHistory();

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { idx } = match.params;

  useBeforeunload((e) => e.preventDefault());

  const handleCategoriesCallback = useCallback(async () => {
    await handleCategories()
      .then(() => {})
      .catch((err: Error) => {
        toast.error("이런! 어딘가 문제가 있어요.");
      });
  }, []);

  const handleUploadFileCallback = useCallback(async (image: File) => {
    let thumbnail = "";
    await handleUploadFile(image)
      .then((res: UploadFileResponse) => {
        thumbnail = convertURL(res.data.files[0]);
      })
      .catch((err: Error) => {
        toast.error("이런! 이미지 업로드에 실패했어요.");
      });
    return thumbnail;
  }, []);

  const handleCreatePostCallback = useCallback(async () => {
    if (!login || !admin) {
      history.push("/");
      return;
    } else if (isEmpty(title) || isEmpty(desc) || isEmpty(content)) {
      toast.error("내용을 입력해주세요.");
      return;
    } else if (!categoryIdx) {
      toast.error("카테고리를 선택해주세요.");
      return;
    }

    let thumbnail: string | undefined;

    if (uploadFile) {
      thumbnail = await handleUploadFileCallback(uploadFile);
    }

    const postParams: CreatePostParams = {
      title: removeLastBlank(title),
      description: removeLastBlank(desc),
      content: removeLastBlank(content),
      category_idx: categoryIdx,
      thumbnail: thumbnail,
    };

    await handleCreatePost(postParams)
      .then((res: Response) => {
        toast.success("야호! 글 작성에 성공했어요!");
        history.push("/");
      })
      .catch((err: Error) => {
        toast.error("앗! 글 작성에 실패했어요.");
      });
  }, [title, desc, content, categoryIdx, uploadFile, login, admin]);

  const handleCreateTempPostCallback = useCallback(async () => {
    if (!login || !admin) {
      history.push("/");
      return;
    } else if (isEmpty(title) || isEmpty(content)) {
      toast.error("내용을 입력해주세요.");
      return;
    }

    let thumbnail: string | undefined;

    if (uploadFile) {
      thumbnail = await handleUploadFileCallback(uploadFile);
    }

    const postParams: CreateTempPostParams = {
      title: removeLastBlank(title),
      description: removeLastBlank(desc) || "임시 저장된 글.",
      content: removeLastBlank(content),
      category_idx: categoryIdx,
      thumbnail: thumbnail,
    };

    await handleCreateTempPost(postParams)
      .then((res: Response) => {
        toast.success("야호! 임시글 글 작성에 성공했어요!");
        history.push("/");
      })
      .catch((err: Error) => {
        toast.error("앗! 글 작성에 실패했어요.");
      });
  }, [title, desc, content, categoryIdx, uploadFile, login, admin]);

  const handleModifyPostCallback = useCallback(
    async (temp: boolean) => {
      if (!login || !admin) {
        history.push("/");
        return;
      }

      if (temp) {
        if (isEmpty(title) || isEmpty(content)) {
          toast.error("내용을 입력해주세요.");
          return;
        }
      } else {
        if (isEmpty(title) || isEmpty(desc) || isEmpty(content)) {
          toast.error("내용을 입력해주세요.");
          return;
        } else if (!categoryIdx) {
          toast.error("카테고리를 선택해주세요.");
          return;
        }
      }

      let thumbnail: string | undefined;

      if (uploadFile) {
        thumbnail = await handleUploadFileCallback(uploadFile);
      } else if (fileName) {
        thumbnail = convertURL(fileName);
      } else {
        thumbnail = "";
      }

      const postParams: ModifyPostParams = {
        idx: Number(idx),
        title: removeLastBlank(title),
        description: removeLastBlank(desc) || "임시 저장된 글.",
        content: removeLastBlank(content),
        category_idx: categoryIdx,
        is_temp: temp,
        thumbnail: thumbnail,
      };

      await handleModifyPost(postParams)
        .then((res: Response) => {
          toast.success("야호! 글 수정에 성공했어요!");
          if (temp) {
            history.push("/");
          } else {
            history.push(`/post/${idx}`);
          }
        })
        .catch((err: Error) => {
          toast.error("앗! 글 수정에 실패했어요.");
        });
    },
    [title, desc, content, categoryIdx, uploadFile]
  );

  const handlePostCallback = useCallback(async () => {
    if (!write) {
      await handlePost(Number(idx))
        .then((res: PostResponse) => {
          setTitle(res.data.post["title"]);
          setDesc(res.data.post["description"]);
          setContent(res.data.post["content"]);
          setCategory(res.data.post["category_name"] || "");
          setFileName(res.data.post["thumbnail"]);
          setPreview(res.data.post["thumbnail"]);
          setCategoryIdx(res.data.post["fk_category_idx"]);
        })
        .catch((err: Error) => {
          toast.error("이런! 어딘가 문제가 있어요.");
        });
    }
  }, [write]);

  const handleAdminCallback = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      handleLoginState(true);
      axios.defaults.headers.common["access_token"] = token;

      await handleMyProfile()
        .then((res: ProfileResponse) => {
          if (res.data.user.is_admin) {
            handleAdminState(true);
          } else {
            history.push("/");
          }
        })
        .catch((err: Error) => {
          if (err.message.indexOf("410")) {
            localStorage.removeItem("access_token");
            handleLoginState(false);
            axios.defaults.headers.common["access_token"] = "";
          }
        });
    } else {
      handleLoginState(false);
      history.push("/");
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      let reader = new FileReader();
      if (e.target.files && e.target.files.length) {
        let file = e.target.files[0];
        setUploadFile(file);
        reader.onloadend = () => {
          setPreview(reader.result);
          setFileName(file.name);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      toast.error("이런! 어딘가 문제가 있어요.");
    }
  };

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

  const goToBeforePage = () => {
    history.goBack();
  };

  const checkIsWriteCallback = useCallback(() => {
    if (!idx) {
      setWrite(true);
    } else {
      setWrite(false);
    }
  }, [idx]);

  const writeClickHandler = () => {
    if (write) {
      handleCreatePostCallback();
    } else {
      handleModifyPostCallback(false);
    }
  };

  const saveClickHandler = () => {
    if (write) {
      handleCreateTempPostCallback();
    } else {
      handleModifyPostCallback(true);
    }
  };

  const writeCancelHandler = useCallback(() => {
    if (
      title !== "" ||
      desc !== "" ||
      content !== "" ||
      uploadFile !== undefined
    ) {
      showModalCallback();
    } else {
      goToBeforePage();
    }
  }, [title, desc, content, uploadFile]);

  const clearImageHandler = () => {
    setUploadFile(undefined);
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
    checkIsWriteCallback();
  }, [checkIsWriteCallback]);

  useEffect(() => {
    handlePostCallback();
  }, [handlePostCallback]);

  useEffect(() => {
    handleAdminCallback();
  }, [handleAdminCallback]);

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
          <HandleCancelAlert
            showModalCallback={showModalCallback}
            push={goToBeforePage}
          />
        </ModalContainer>
      </Portal>
      <Handle
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
        writeClickHandler={writeClickHandler}
        saveClickHandler={saveClickHandler}
        keyDownHandler={keyDownHandler}
      />
    </>
  );
};

export default withRouter(observer(HandleContainer));
