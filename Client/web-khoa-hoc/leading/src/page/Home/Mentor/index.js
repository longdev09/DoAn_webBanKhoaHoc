import classNames from "classnames/bind";
import style from "./mentorItem.module.scss";
const cx = classNames.bind(style);

export default function MentorItem() {
  return (
    <div className={cx("mentor-wrapp")}>
      <a className={cx("mentor-item")}>
        <div className={cx("item-avta")}>
          <img
            className={cx("item-img")}
            src="https://unica.vn/uploads/dang-trong-khang/July222021258pm_dang-trong-khang_thumb.png"
          />
        </div>
        <h3 className={cx("item-name")}>Nguyễn Bạch Long</h3>
        <p className={cx("item-des")}>
          Kỷ lục gia Siêu trí nhớ Thế giới - Chủ tịch Tổ chức Trí nhớ Việt Nam
        </p>
      </a>
    </div>
  );
}
