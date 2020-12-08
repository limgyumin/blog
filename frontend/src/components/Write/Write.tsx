import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import { RiPencilRuler2Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";
import { FiImage, FiSave } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import "./Write.scss";

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
}: WriteProps) => {
  return (
    <>
      <div className="Write">
        <div className="Write-Container">
          <p className="Write-Container-Label">
            <RiPencilRuler2Line />
            작성하기
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
            <label htmlFor="file">
              <FiImage />
              업로드
            </label>
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => handleImageChange(e)}
            />
            {fileName && (
              <div className="Write-Container-Input-Name">
                {fileName}
                <TiDelete onClick={() => clearImageHandler()} />
              </div>
            )}
          </div>
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="Write-Container-Content"
            placeholder="자! 이제 마음껏 이야기를 써보죠!"
          />
        </div>
        <div className="Write-Preview">
          <p className="Write-Preview-Label">
            <AiOutlineEye />
            미리보기
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
          <button className="Write-Control-Confirm" onClick={() => {}}>
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
