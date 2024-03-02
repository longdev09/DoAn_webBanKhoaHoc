import classNames from "classnames/bind";
import style from "./homeReason.module.scss";
const cx = classNames.bind(style);

function ItemReason() {
  return (
    <div className={cx("item-reason-wrappp")}>
      <a className={cx("item")}>
        <div className={cx("item-icon")}>
          <img src="https://unica.vn/media/images/icon-ts-1.png" />
        </div>
        <div className={cx("item-title")}>
          <span className={cx("solagar")}>Giảng viên uy tín</span>
          <span className={cx("des")}>Bài giảng chất lượng</span>
        </div>
      </a>
    </div>
  );
}
export default function HomeReason() {
  return (
    <div className={cx("reason-wrapp")}>
      <div className={cx("item-reason1")}>
        <ItemReason />
      </div>
      <div className={cx("item-center")}>
        <img src="https://static.topcv.vn/v4/image/welcome/superior-tool/superior-tool-bg.png?v=1.0.1" />
      </div>
      <div className={cx("item-reason1")}>
        <ItemReason />
      </div>
    </div>
  );
}
