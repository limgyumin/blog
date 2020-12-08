import React from "react";
import MarkDownContainer from "../../containers/MarkDown/MarkDownContainer";
import { RiPencilRuler2Line } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
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
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="Write-Container-Content"
            placeholder="내용을 입력해주세요."
          />
        </div>
        <div className="Write-Preview">
          <p className="Write-Preview-Label">
            <AiOutlineEye />
            미리보기
          </p>
          <p className="Write-Preview-Title">{title}</p>
          <p className="Write-Preview-Description">{desc}</p>
          <MarkDownContainer className="Write-Preview-Content">
            {content}
          </MarkDownContainer>
        </div>
        <div className="Write-Control">
          <button className="Write-Control-Confirm" onClick={() => {}}>
            작성하기
          </button>
          <button
            className="Write-Control-Cancel"
            onClick={() => writeCancelHandler()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default Write;
