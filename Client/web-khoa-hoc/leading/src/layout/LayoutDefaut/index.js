import Header from "./Header";
import Footer from "./Footer";

import classNames from "classnames/bind";
import styles from "./LayoutDefaut.module.scss";

const cx = classNames.bind(styles);

export default function LayoutDefaut({ children }) {
  return (
    <>
      <Header />

      <div className={cx("main-container")}>{children}</div>

      <Footer />
    </>
  );
}
