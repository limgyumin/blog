import React from "react";
import "./HandleCancelAlert.scss";

interface HandleCancelAlertProps {
  showModalCallback: () => void;
  push: () => void;
}

const HandleCancelAlert = ({
  showModalCallback,
  push,
}: HandleCancelAlertProps) => {
  return (
    <>
      <div className="Handle-Cancel-Alert">
        <div className="Handle-Cancel-Alert-Content">
          <h2>작성 취소</h2>
          <p>
            작성중인 내용이 모두 삭제됩니다.
            <br />
            정말로 작성을 취소하시겠어요?
          </p>
        </div>
        <div className="Handle-Cancel-Alert-Button">
          <button
            className="Handle-Cancel-Alert-Button-Delete"
            onClick={() => push()}
          >
            네, 안적을래요.
          </button>
          <button
            className="Handle-Cancel-Alert-Button-Cancel"
            onClick={() => showModalCallback()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default HandleCancelAlert;
