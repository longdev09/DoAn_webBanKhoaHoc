import SiderBarMentor from "./SiderBarMentor";
import HeaderMentor from "./HeaderMentor";
import classNames from "classnames/bind";
import style from "./LayoutMentor.module.scss";
import Footer from "../LayoutDefaut/Footer";
const cx = classNames.bind(style);

export default function LayoutAdmin({ children }) {
  return (
    <>
      {/* <Header /> */}
      <div className={cx("main-container")}>
        <SiderBarMentor />
        <div className={cx("wrapp-content")}>
          <HeaderMentor />
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
    </>
  );
}
