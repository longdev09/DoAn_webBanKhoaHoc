import classNames from "classnames/bind";
import style from "./homeLeadingTodayItem.module.scss";
const cx = classNames.bind(style);

export default function HomeLeadingTodyItem() {
  return (
    <div className={cx("list-tody")}>
      <a className={cx("list-wrapp")}>
        <div className={cx("item-img")}>
          <img className={cx("img-")} src="https://www.topcv.vn/v4/image/welcome/top-categories/kinh-doanh-ban-hang.png?v=2" />
        </div>
        <h3 className={cx("text-title")}>Sale, Bang hang</h3>
        <p className={cx("text-sub")}>12.000 khóa học</p>
      </a>
    </div>
  );
}
