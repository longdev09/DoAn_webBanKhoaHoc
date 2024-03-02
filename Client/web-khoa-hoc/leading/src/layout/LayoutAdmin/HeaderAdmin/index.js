import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

import classNames from "classnames/bind";
import style from "./HeaderAdmin.module.scss";
const cx = classNames.bind(style);

export default function HeaderAdmin() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <div className={cx("mentor")}>
          <span>Welcome Back , </span> <span>Long</span>
        </div>
        <div className={cx("action")}>
          <div className={cx("bell")}>
            <FontAwesomeIcon icon={faBell} />
          </div>

          <div className={cx("avata")}>
            <img src="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}
