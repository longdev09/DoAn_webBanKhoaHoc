import classNames from "classnames/bind";
import style from "./Hearder_Course.module.scss";
const cx = classNames.bind(style);

export default function Header_Course({ title, icon, content, chidren }) {
  return (
    <div>
      <>
        <div className={cx("header")}>
          <span>{icon}</span>
          <h2>{title}</h2>
        </div>
        <div className={cx("content")}>{chidren}</div>
      </>
    </div>
  );
}
