import React, { FC } from "react";
import classNames from "classnames";
import { ClassNamesFn } from "classnames/types";

const styles = require("./HandleDescription.scss");
const cx: ClassNamesFn = classNames.bind(styles);

type HandleDescriptionProps = {
  description: string;
  onChange: (name: string, value: any) => void;
};

const HandleDescription: FC<HandleDescriptionProps> = ({ description, onChange }) => {
  return (
    <div className={cx("handle-description")}>
      <p className={cx("handle-description-name")}>소개</p>
      <textarea
        className={cx("handle-description-write")}
        value={description}
        name="description"
        placeholder="소개를 작성해주세요."
        onChange={({ target: { name, value } }) => onChange(name, value)}
      />
    </div>
  );
};

export default HandleDescription;
