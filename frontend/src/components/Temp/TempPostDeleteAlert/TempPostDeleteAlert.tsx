import React from "react";
import "./TempPostDeleteAlert.scss";

interface TempPostDeleteAlertProps {
  deletePostHandler: () => Promise<void>;
  showModalCallback: () => void;
}

const TempPostDeleteAlert = ({
  deletePostHandler,
  showModalCallback,
}: TempPostDeleteAlertProps) => {
  return (
    <>
      <div className="Temp-Post-Delete">
        <div className="Temp-Post-Delete-Content">
          <h2>임시 글 삭제</h2>
          <p>정말로 임시 글을 삭제하시겠어요?</p>
        </div>
        <div className="Temp-Post-Delete-Button">
          <button
            className="Temp-Post-Delete-Button-Delete"
            onClick={() => deletePostHandler()}
          >
            삭제
          </button>
          <button
            className="Temp-Post-Delete-Button-Cancel"
            onClick={() => showModalCallback()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default TempPostDeleteAlert;
