import classNames from "classnames/bind";
import style from "./Arrow.module.scss";

const cx = classNames.bind(style);

export default function Arrow({ children, nextArrow, prevArrow, onClick }) {
  const props = {
    onClick,
  };

  const propsStyles = cx("arrow", {
    nextArrow,
    prevArrow,
  });
  return (
    <div className={propsStyles} {...props}>
      {children}
    </div>
  );
}
