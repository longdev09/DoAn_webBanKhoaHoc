import SiderBarAdmin from "./SiderBarAdmin";
import HeaderAdmin from "./HeaderAdmin";
import classNames from "classnames/bind";
import style from "./LayoutAdmin.module.scss";
const cx = classNames.bind(style);

export default function LayoutAdmin({ children }) {
  return (
    <>
      {/* <Header /> */}
      <div className={cx("main-container")}>
        <SiderBarAdmin />
        <div className={cx("wrapp-content")}>
          <HeaderAdmin />
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
    </>
  );
}
