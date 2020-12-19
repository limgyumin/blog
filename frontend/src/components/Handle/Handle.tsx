import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import { ReactComponent as Option } from "../../assets/images/option.svg";
import "./Handle.scss";
import { CategoryType } from "../../util/types/Category";
import HandleCategoryOption from "./HandleCategoryOption";

interface HandleProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  titleRef: React.RefObject<HTMLTextAreaElement>;
  desc: string;
  setDesc: React.Dispatch<React.SetStateAction<string>>;
  descRef: React.RefObject<HTMLTextAreaElement>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  contentRef: React.RefObject<HTMLTextAreaElement>;
  writeCancelHandler: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string | ArrayBuffer | null;
  fileName: string;
  clearImageHandler: () => void;
  categories: CategoryType[];
  category: string;
  showOption: boolean;
  setShowOption: React.Dispatch<React.SetStateAction<boolean>>;
  categoryItemHandler: (name: string, idx: number) => void;
  writeClickHandler: () => void;
  keyDownHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Handle = ({
  title,
  setTitle,
  titleRef,
  desc,
  setDesc,
  descRef,
  content,
  setContent,
  contentRef,
  writeCancelHandler,
  handleImageChange,
  preview,
  fileName,
  clearImageHandler,
  categories,
  category,
  showOption,
  setShowOption,
  categoryItemHandler,
  writeClickHandler,
  keyDownHandler,
}: HandleProps) => {
  return (
    <>
      <div className="Handle">
        <div className="Handle-Container">
          <p className="Handle-Container-Label">
            <HiOutlinePencil />
            Write
          </p>
          <textarea
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="Handle-Container-Title"
            placeholder="제목을 입력해주세요."
          />
          <textarea
            ref={descRef}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="Handle-Container-Description"
            placeholder="설명을 입력해주세요."
          />
          <div className="Handle-Container-Input">
            <div className="Handle-Container-Input-Button">
              <p className="Handle-Container-Input-Button-FileName">
                {fileName || "썸네일 이미지를 선택해주세요."}
              </p>
              {fileName ? (
                <div
                  onClick={() => clearImageHandler()}
                  className="Handle-Container-Input-Button-Delete"
                >
                  삭제
                </div>
              ) : (
                <label
                  htmlFor="file"
                  className="Handle-Container-Input-Button-Label"
                >
                  업로드
                </label>
              )}
            </div>
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageChange(e)}
            />
            <div
              className="Handle-Container-Input-Category"
              onClick={() => setShowOption(true)}
            >
              {category || "카테고리"}
              <Option />
              {showOption && (
                <HandleCategoryOption
                  categories={categories}
                  setShowOption={setShowOption}
                  categoryItemHandler={categoryItemHandler}
                />
              )}
            </div>
          </div>
          <textarea
            ref={contentRef}
            value={content}
            onKeyDown={(e) => keyDownHandler(e)}
            onChange={(e) => setContent(e.target.value)}
            className="Handle-Container-Content"
            placeholder="자! 이제 마음껏 이야기를 써보죠!"
          />
        </div>
        <div className="Handle-Preview">
          <p className="Handle-Preview-Label">
            <AiOutlineEye />
            Preview
          </p>
          <p className="Handle-Preview-Title">{title}</p>
          <p className="Handle-Preview-Description">{desc}</p>
          {preview && (
            <div className="Handle-Preview-Thumbnail">
              <img
                src={preview.toString()}
                className="Handle-Preview-Thumbnail-Image"
              />
            </div>
          )}
          <MarkDownContainer className="Handle-Preview-Content">
            {content}
          </MarkDownContainer>
        </div>
        <div className="Handle-Control">
          <button
            className="Handle-Control-Confirm"
            onClick={() => writeClickHandler()}
          >
            <HiOutlinePencil />
          </button>
          <button className="Handle-Control-Save" onClick={() => {}}>
            <FiSave />
          </button>
          <button
            className="Handle-Control-Cancel"
            onClick={() => writeCancelHandler()}
          >
            <IoMdExit />
          </button>
        </div>
      </div>
    </>
  );
};

export default Handle;
