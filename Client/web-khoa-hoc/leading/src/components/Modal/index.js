import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import style from "./Modal.module.scss";
const cx = classNames.bind(style);

export default function Modal({
  title,
  showModal,
  closeModal,
  children,
  className,
}) {
  const propsStyle = cx("modal-content", {
    [className]: className,
  });
  return (
    <div
      className={cx("modal", { active: showModal })}
      style={{ visibility: showModal ? "initial" : "hidden" }}
    >
      <div className={propsStyle}>
        <div className={cx("heading")}>
          <h2>{title}</h2>
          <span className={cx("close")} onClick={closeModal}>
            &times;
          </span>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
