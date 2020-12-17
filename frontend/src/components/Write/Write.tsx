import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import { ReactComponent as Option } from "../../assets/images/option.svg";
import "./Write.scss";
import { CategoryType } from "../../util/types/Category";
import WriteCategoryOption from "./WriteCategoryOption";

interface WriteProps {
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
  handleWritePostCallback: () => Promise<void>;
  keyDownHandler: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Write = ({
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
  handleWritePostCallback,
  keyDownHandler,
}: WriteProps) => {
  return (
    <>
      <div className="Write">
        <div className="Write-Container">
          <p className="Write-Container-Label">
            <HiOutlinePencil />
            Write
          </p>
          <textarea
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="Write-Container-Title"
            placeholder="제목을 입력해주세요."
          />
          <textarea
            ref={descRef}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="Write-Container-Description"
            placeholder="설명을 입력해주세요."
          />
          <div className="Write-Container-Input">
            <div className="Write-Container-Input-Button">
              <p className="Write-Container-Input-Button-FileName">
                {fileName || "썸네일 이미지를 선택해주세요."}
              </p>
              {fileName ? (
                <div
                  onClick={() => clearImageHandler()}
                  className="Write-Container-Input-Button-Delete"
                >
                  삭제
                </div>
              ) : (
                <label
                  htmlFor="file"
                  className="Write-Container-Input-Button-Label"
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
              className="Write-Container-Input-Category"
              onClick={() => setShowOption(true)}
            >
              {category || "카테고리"}
              <Option />
              {showOption && (
                <WriteCategoryOption
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
            className="Write-Container-Content"
            placeholder="자! 이제 마음껏 이야기를 써보죠!"
          />
        </div>
        <div className="Write-Preview">
          <p className="Write-Preview-Label">
            <AiOutlineEye />
            Preview
          </p>
          <p className="Write-Preview-Title">{title}</p>
          <p className="Write-Preview-Description">{desc}</p>
          {preview && (
            <div className="Write-Preview-Thumbnail">
              <img
                src={preview.toString()}
                className="Write-Preview-Thumbnail-Image"
              />
            </div>
          )}
          <MarkDownContainer className="Write-Preview-Content">
            {content}
          </MarkDownContainer>
        </div>
        <div className="Write-Control">
          <button
            className="Write-Control-Confirm"
            onClick={() => handleWritePostCallback()}
          >
            <HiOutlinePencil />
          </button>
          <button className="Write-Control-Save" onClick={() => {}}>
            <FiSave />
          </button>
          <button
            className="Write-Control-Cancel"
            onClick={() => writeCancelHandler()}
          >
            <IoMdExit />
          </button>
        </div>
      </div>
    </>
  );
};

export default Write;
