import React from "react";
import "./CategoryDeleteAlert.scss";

interface CategoryDeleteAlertProps {
  deleteClickHandler: () => void;
  showModalCallback: () => void;
}

const CategoryDeleteAlert = ({
  deleteClickHandler,
  showModalCallback,
}: CategoryDeleteAlertProps) => {
  return (
    <>
      <div className="Category-Delete-Alert">
        <div className="Category-Delete-Alert-Content">
          <h2>카테고리 삭제</h2>
          <p>
            카테고리가 삭제되면 관련 게시물도 모두 삭제됩니다.
            <br />
            정말로 삭제하시겠어요?
          </p>
        </div>
        <div className="Category-Delete-Alert-Button">
          <button
            className="Category-Delete-Alert-Button-Delete"
            onClick={() => deleteClickHandler()}
          >
            삭제
          </button>
          <button
            className="Category-Delete-Alert-Button-Cancel"
            onClick={() => showModalCallback()}
          >
            취소
          </button>
        </div>
      </div>
    </>
  );
};

export default CategoryDeleteAlert;
